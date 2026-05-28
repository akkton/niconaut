// Public comment thread endpoint for nicolasneumann.blog.
// GET  /api/comments?path=/posts/foo/   -> list visible comments for that path
// POST /api/comments                    -> insert one comment

interface Env {
	COMMENTS_DB: D1Database;
	HASH_SALT: string;
}

const POST_PATH_RE = /^\/(?:pt\/|de\/)?(?:posts|journal)\/[a-z0-9][a-z0-9-]*\/?$/i;
const MAX_BODY_LEN = 4000;
const MAX_NAME_LEN = 60;
const MAX_EMAIL_LEN = 254;
const RATE_LIMIT_COUNT = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function json(body: unknown, init: ResponseInit = {}): Response {
	return new Response(JSON.stringify(body), {
		...init,
		headers: { 'content-type': 'application/json; charset=utf-8', ...(init.headers ?? {}) },
	});
}

function normalizePath(raw: string | null | undefined): string | null {
	if (!raw) return null;
	let p = raw.trim();
	if (!p.startsWith('/')) return null;
	if (!p.endsWith('/')) p += '/';
	if (p.length > 200) return null;
	if (!POST_PATH_RE.test(p)) return null;
	return p;
}

async function sha256Hex(input: string): Promise<string> {
	const bytes = new TextEncoder().encode(input);
	const digest = await crypto.subtle.digest('SHA-256', bytes);
	const view = new Uint8Array(digest);
	let hex = '';
	for (let i = 0; i < view.length; i++) hex += view[i].toString(16).padStart(2, '0');
	return hex;
}

type CommentRow = {
	id: string;
	author_name: string;
	body: string;
	created_at: number;
	parent_id: string | null;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
	const url = new URL(request.url);
	const path = normalizePath(url.searchParams.get('path'));
	if (!path) return json({ error: 'invalid_path' }, { status: 400 });

	const { results } = await env.COMMENTS_DB.prepare(
		`SELECT id, author_name, body, created_at, parent_id FROM comments
		 WHERE post_path = ? AND status = 'visible'
		 ORDER BY created_at ASC LIMIT 500`,
	)
		.bind(path)
		.all<CommentRow>();

	return json(
		{ comments: results ?? [] },
		{ headers: { 'cache-control': 'public, max-age=30, s-maxage=30' } },
	);
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	let payload: Record<string, unknown>;
	try {
		payload = (await request.json()) as Record<string, unknown>;
	} catch {
		return json({ error: 'invalid_json' }, { status: 400 });
	}

	// Honeypot: bots fill the `website` field. Return 200 so they don't retry.
	if (typeof payload.website === 'string' && payload.website.length > 0) {
		return json({ ok: true, suppressed: true });
	}

	const path = normalizePath(typeof payload.post_path === 'string' ? payload.post_path : null);
	if (!path) return json({ error: 'invalid_path' }, { status: 400 });

	const authorName = typeof payload.author_name === 'string' ? payload.author_name.trim() : '';
	if (!authorName || authorName.length > MAX_NAME_LEN) {
		return json({ error: 'invalid_name' }, { status: 400 });
	}

	const body = typeof payload.body === 'string' ? payload.body.trim() : '';
	if (!body || body.length > MAX_BODY_LEN) {
		return json({ error: 'invalid_body' }, { status: 400 });
	}

	const emailRaw = typeof payload.email === 'string' ? payload.email.trim() : '';
	if (emailRaw && emailRaw.length > MAX_EMAIL_LEN) {
		return json({ error: 'invalid_email' }, { status: 400 });
	}

	let parentId: string | null = null;
	if (typeof payload.parent_id === 'string' && payload.parent_id.length > 0) {
		const candidate = payload.parent_id.trim();
		if (candidate.length > 64) return json({ error: 'invalid_parent' }, { status: 400 });
		const parent = await env.COMMENTS_DB.prepare(
			`SELECT id, post_path, parent_id, status FROM comments WHERE id = ?`,
		)
			.bind(candidate)
			.first<{ id: string; post_path: string; parent_id: string | null; status: string }>();
		if (!parent) return json({ error: 'parent_not_found' }, { status: 400 });
		if (parent.post_path !== path) return json({ error: 'parent_wrong_thread' }, { status: 400 });
		if (parent.parent_id !== null) return json({ error: 'no_nested_replies' }, { status: 400 });
		if (parent.status !== 'visible') return json({ error: 'parent_not_visible' }, { status: 400 });
		parentId = candidate;
	}

	const salt = env.HASH_SALT ?? '';
	const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
	const ipHash = await sha256Hex(`${ip}:${salt}`);
	const emailHash = emailRaw ? await sha256Hex(`${emailRaw.toLowerCase()}:${salt}`) : null;

	const since = Date.now() - RATE_LIMIT_WINDOW_MS;
	const rateRow = await env.COMMENTS_DB.prepare(
		`SELECT COUNT(*) AS n FROM comments WHERE ip_hash = ? AND created_at > ?`,
	)
		.bind(ipHash, since)
		.first<{ n: number }>();

	if (rateRow && rateRow.n >= RATE_LIMIT_COUNT) {
		return json({ error: 'rate_limited' }, { status: 429 });
	}

	const id = crypto.randomUUID();
	const createdAt = Date.now();

	await env.COMMENTS_DB.prepare(
		`INSERT INTO comments (id, post_path, author_name, author_email_hash, body, created_at, status, parent_id, ip_hash)
		 VALUES (?, ?, ?, ?, ?, ?, 'visible', ?, ?)`,
	)
		.bind(id, path, authorName, emailHash, body, createdAt, parentId, ipHash)
		.run();

	return json({
		comment: { id, author_name: authorName, body, created_at: createdAt, parent_id: parentId },
	}, { status: 201 });
};
