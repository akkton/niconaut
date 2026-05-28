// Admin moderation endpoint. Bearer-auth.
// GET  /api/comments/admin              -> list recent comments with all metadata
// GET  /api/comments/admin?status=hidden -> filter by status
// POST /api/comments/admin              -> { id, action: 'hidden' | 'visible' | 'pending' | 'delete' }

interface Env {
	COMMENTS_DB: D1Database;
	ADMIN_TOKEN: string;
}

const ALLOWED_STATUSES = new Set(['visible', 'hidden', 'pending']);
const ALLOWED_ACTIONS = new Set([...ALLOWED_STATUSES, 'delete']);

function json(body: unknown, init: ResponseInit = {}): Response {
	return new Response(JSON.stringify(body), {
		...init,
		headers: { 'content-type': 'application/json; charset=utf-8', ...(init.headers ?? {}) },
	});
}

function checkAuth(request: Request, env: Env): boolean {
	if (!env.ADMIN_TOKEN) return false;
	const header = request.headers.get('authorization') ?? '';
	const expected = `Bearer ${env.ADMIN_TOKEN}`;
	if (header.length !== expected.length) return false;
	let mismatch = 0;
	for (let i = 0; i < header.length; i++) {
		mismatch |= header.charCodeAt(i) ^ expected.charCodeAt(i);
	}
	return mismatch === 0;
}

type AdminRow = {
	id: string;
	post_path: string;
	author_name: string;
	author_email_hash: string | null;
	body: string;
	created_at: number;
	status: string;
	parent_id: string | null;
	ip_hash: string | null;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
	if (!checkAuth(request, env)) return json({ error: 'unauthorized' }, { status: 401 });

	const url = new URL(request.url);
	const statusFilter = url.searchParams.get('status');
	const limit = Math.min(Number(url.searchParams.get('limit') ?? 200) || 200, 1000);

	let stmt;
	if (statusFilter && ALLOWED_STATUSES.has(statusFilter)) {
		stmt = env.COMMENTS_DB.prepare(
			`SELECT id, post_path, author_name, author_email_hash, body, created_at, status, parent_id, ip_hash
			 FROM comments WHERE status = ? ORDER BY created_at DESC LIMIT ?`,
		).bind(statusFilter, limit);
	} else {
		stmt = env.COMMENTS_DB.prepare(
			`SELECT id, post_path, author_name, author_email_hash, body, created_at, status, parent_id, ip_hash
			 FROM comments ORDER BY created_at DESC LIMIT ?`,
		).bind(limit);
	}

	const { results } = await stmt.all<AdminRow>();
	return json({ comments: results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	if (!checkAuth(request, env)) return json({ error: 'unauthorized' }, { status: 401 });

	let payload: Record<string, unknown>;
	try {
		payload = (await request.json()) as Record<string, unknown>;
	} catch {
		return json({ error: 'invalid_json' }, { status: 400 });
	}

	const id = typeof payload.id === 'string' ? payload.id : '';
	const action = typeof payload.action === 'string' ? payload.action : '';
	if (!id) return json({ error: 'missing_id' }, { status: 400 });
	if (!ALLOWED_ACTIONS.has(action)) return json({ error: 'invalid_action' }, { status: 400 });

	if (action === 'delete') {
		await env.COMMENTS_DB.prepare(`DELETE FROM comments WHERE id = ?`).bind(id).run();
		return json({ ok: true, id, action });
	}

	await env.COMMENTS_DB.prepare(`UPDATE comments SET status = ? WHERE id = ?`)
		.bind(action, id)
		.run();
	return json({ ok: true, id, action });
};
