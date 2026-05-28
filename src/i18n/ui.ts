// i18n chrome dictionary + helpers.
// Long-form content (posts, journal, home/about prose) lives in translated files/pages.
// This dictionary holds the shared UI strings: nav, labels, headings, newsletter, footer.

export const LOCALES = ['en', 'pt', 'de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
	en: 'EN',
	pt: 'PT',
	de: 'DE',
};

// Paths (after stripping any locale prefix) that have localized versions.
// The language switcher maps these; on any other page it stays put (never bounces home).
export const TRANSLATABLE_PREFIXES = ['', 'about', 'posts', 'journal', 'projects', 'feedback'];

type Dict = {
	nav: { journal: string; posts: string; building: string; work: string; about: string; feedback: string };
	labels: {
		allPosts: string;
		allEntries: string;
		backPosts: string;
		backEntries: string;
		since: string;
		updated: string;
		minRead: string;
		noEntries: string;
		noPosts: string;
	};
	headings: { posts: string; journal: string; recentJournal: string; recentPosts: string };
	newsletter: { title: string; sub: string; emailLabel: string; want: string; both: string; journalOnly: string; postsOnly: string; subscribe: string; subscribing: string; success: string; invalid: string; error: string };
	footer: { rights: string };
	comments: {
		title: string;
		empty: string;
		loading: string;
		loadError: string;
		formTitle: string;
		namePlaceholder: string;
		emailPlaceholder: string;
		bodyPlaceholder: string;
		note: string;
		submit: string;
		submitting: string;
		successPosted: string;
		errorMissing: string;
		errorRate: string;
		errorGeneric: string;
		justNow: string;
		reply: string;
		cancel: string;
		inReplyTo: string;
		replyPlaceholder: string;
	};
};

export const ui: Record<Locale, Dict> = {
	en: {
		nav: { journal: 'Journal', posts: 'Posts', building: 'Projects', work: 'Work', about: 'About', feedback: 'Feedback' },
		labels: {
			allPosts: 'all posts',
			allEntries: 'all entries',
			backPosts: 'all posts',
			backEntries: 'all entries',
			since: 'since',
			updated: 'updated',
			minRead: 'min read',
			noEntries: 'No entries yet.',
			noPosts: 'No long-form posts yet.',
		},
		headings: { posts: 'Posts', journal: 'Journal', recentJournal: 'Recent journal', recentPosts: 'Recent posts' },
		newsletter: {
			title: 'Get this in your inbox',
			sub: 'One email when a new piece lands. Sent through Buttondown, with a one-click unsubscribe in every email. No tracking pixels.',
			emailLabel: 'Email',
			want: 'I want…',
			both: 'Both',
			journalOnly: 'Journal only',
			postsOnly: 'Long-form posts only',
			subscribe: 'Subscribe',
			subscribing: 'Subscribing…',
			success: 'Check your inbox. Click the confirmation link and you are in.',
			invalid: 'Please enter a valid email.',
			error: 'Something went wrong. Try again, or email me at neumanic2@gmail.com.',
		},
		footer: { rights: 'Building, learning, journaling in public.' },
		comments: {
			title: 'Comments',
			empty: 'No comments yet. Be the first.',
			loading: 'Loading comments…',
			loadError: 'Could not load comments. Refresh to try again.',
			formTitle: 'Leave a comment',
			namePlaceholder: 'Name',
			emailPlaceholder: 'Email (optional, only if you want a reply)',
			bodyPlaceholder: "What's on your mind? Plain text, no HTML.",
			note: 'Plain text only. URLs are linkified automatically. Posted immediately, lightly moderated after the fact.',
			submit: 'Post comment',
			submitting: 'Posting…',
			successPosted: 'Posted. Thanks for chiming in.',
			errorMissing: 'Name and comment are required.',
			errorRate: "You've sent a few in a row. Take a breath and try in an hour.",
			errorGeneric: 'Something went wrong. Try again.',
			justNow: 'just now',
			reply: 'Reply',
			cancel: 'Cancel',
			inReplyTo: 'in reply to',
			replyPlaceholder: 'Reply',
		},
	},
	pt: {
		nav: { journal: 'Diário', posts: 'Artigos', building: 'Projetos', work: 'Trabalho', about: 'Sobre', feedback: 'Feedback' },
		labels: {
			allPosts: 'todos os artigos',
			allEntries: 'todas as entradas',
			backPosts: 'todos os artigos',
			backEntries: 'todas as entradas',
			since: 'desde',
			updated: 'atualizado',
			minRead: 'min de leitura',
			noEntries: 'Ainda não há entradas.',
			noPosts: 'Ainda não há artigos longos.',
		},
		headings: { posts: 'Artigos', journal: 'Diário', recentJournal: 'Diário recente', recentPosts: 'Artigos recentes' },
		newsletter: {
			title: 'Receba isto no seu e-mail',
			sub: 'Um e-mail quando algo novo é publicado. Enviado pelo Buttondown, com cancelamento em um clique em cada e-mail. Sem pixels de rastreamento.',
			emailLabel: 'E-mail',
			want: 'Eu quero…',
			both: 'Ambos',
			journalOnly: 'Só o diário',
			postsOnly: 'Só os artigos longos',
			subscribe: 'Inscrever-se',
			subscribing: 'Inscrevendo…',
			success: 'Verifique seu e-mail. Clique no link de confirmação e pronto.',
			invalid: 'Por favor, insira um e-mail válido.',
			error: 'Algo deu errado. Tente de novo, ou escreva para neumanic2@gmail.com.',
		},
		footer: { rights: 'Construindo, aprendendo e escrevendo em público.' },
		comments: {
			title: 'Comentários',
			empty: 'Ainda não há comentários. Seja o primeiro.',
			loading: 'Carregando comentários…',
			loadError: 'Não foi possível carregar os comentários. Atualize para tentar de novo.',
			formTitle: 'Deixe um comentário',
			namePlaceholder: 'Nome',
			emailPlaceholder: 'E-mail (opcional, só se quiser uma resposta)',
			bodyPlaceholder: 'O que está pensando? Texto simples, sem HTML.',
			note: 'Só texto simples. URLs viram links automaticamente. Publicado na hora, com moderação leve depois.',
			submit: 'Publicar comentário',
			submitting: 'Publicando…',
			successPosted: 'Publicado. Obrigado por participar.',
			errorMissing: 'Nome e comentário são obrigatórios.',
			errorRate: 'Você enviou alguns seguidos. Respire e tente em uma hora.',
			errorGeneric: 'Algo deu errado. Tente de novo.',
			justNow: 'agora mesmo',
			reply: 'Responder',
			cancel: 'Cancelar',
			inReplyTo: 'em resposta a',
			replyPlaceholder: 'Resposta',
		},
	},
	de: {
		nav: { journal: 'Tagebuch', posts: 'Beiträge', building: 'Projekte', work: 'Arbeit', about: 'Über mich', feedback: 'Feedback' },
		labels: {
			allPosts: 'alle Beiträge',
			allEntries: 'alle Einträge',
			backPosts: 'alle Beiträge',
			backEntries: 'alle Einträge',
			since: 'seit',
			updated: 'aktualisiert',
			minRead: 'Min. Lesezeit',
			noEntries: 'Noch keine Einträge.',
			noPosts: 'Noch keine langen Beiträge.',
		},
		headings: { posts: 'Beiträge', journal: 'Tagebuch', recentJournal: 'Neueste Einträge', recentPosts: 'Neueste Beiträge' },
		newsletter: {
			title: 'Bekomm das in dein Postfach',
			sub: 'Eine E-Mail, wenn etwas Neues erscheint. Versandt über Buttondown, mit Abmeldung per Klick in jeder E-Mail. Keine Tracking-Pixel.',
			emailLabel: 'E-Mail',
			want: 'Ich möchte…',
			both: 'Beides',
			journalOnly: 'Nur das Tagebuch',
			postsOnly: 'Nur die langen Beiträge',
			subscribe: 'Abonnieren',
			subscribing: 'Wird abonniert…',
			success: 'Schau in dein Postfach. Klick auf den Bestätigungslink, dann bist du dabei.',
			invalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
			error: 'Etwas ist schiefgelaufen. Versuch es erneut, oder schreib an neumanic2@gmail.com.',
		},
		footer: { rights: 'Bauen, lernen und öffentlich dokumentieren.' },
		comments: {
			title: 'Kommentare',
			empty: 'Noch keine Kommentare. Sei der Erste.',
			loading: 'Kommentare werden geladen…',
			loadError: 'Kommentare konnten nicht geladen werden. Lade neu, um es erneut zu versuchen.',
			formTitle: 'Hinterlasse einen Kommentar',
			namePlaceholder: 'Name',
			emailPlaceholder: 'E-Mail (optional, nur wenn du eine Antwort möchtest)',
			bodyPlaceholder: 'Was beschäftigt dich? Klartext, kein HTML.',
			note: 'Nur Klartext. URLs werden automatisch verlinkt. Sofort sichtbar, danach leicht moderiert.',
			submit: 'Kommentar absenden',
			submitting: 'Wird gesendet…',
			successPosted: 'Veröffentlicht. Danke fürs Mitreden.',
			errorMissing: 'Name und Kommentar sind erforderlich.',
			errorRate: 'Du hast einige in Folge gesendet. Atme durch und versuch es in einer Stunde.',
			errorGeneric: 'Etwas ist schiefgelaufen. Versuch es erneut.',
			justNow: 'gerade eben',
			reply: 'Antworten',
			cancel: 'Abbrechen',
			inReplyTo: 'Antwort an',
			replyPlaceholder: 'Antwort',
		},
	},
};

export function getLangFromUrl(url: URL): Locale {
	const seg = url.pathname.split('/').filter(Boolean)[0];
	if (seg && (LOCALES as readonly string[]).includes(seg)) return seg as Locale;
	return DEFAULT_LOCALE;
}

export function useTranslations(lang: Locale) {
	return ui[lang] ?? ui[DEFAULT_LOCALE];
}

// Strip any leading locale segment, returning the canonical (en) path with a leading slash.
export function stripLocale(pathname: string): string {
	const parts = pathname.split('/').filter(Boolean);
	if (parts.length && (LOCALES as readonly string[]).includes(parts[0])) parts.shift();
	return '/' + parts.join('/');
}

// Build the URL for `pathname` in `lang`. If the page has no localized variant, stay on
// the current page instead of bouncing home, so the switcher never throws the reader off
// the page they are on (and never points at a 404).
export function localizedPath(pathname: string, lang: Locale): string {
	const canonical = stripLocale(pathname);
	const firstSeg = canonical.split('/').filter(Boolean)[0] ?? '';
	const translatable = TRANSLATABLE_PREFIXES.includes(firstSeg);
	if (!translatable) return pathname;
	if (lang === DEFAULT_LOCALE) return ensureTrailingSlash(canonical);
	const joined = canonical === '/' ? `/${lang}/` : `/${lang}${canonical}`;
	return ensureTrailingSlash(joined);
}

function ensureTrailingSlash(p: string): string {
	if (p === '/') return p;
	if (p.endsWith('/')) return p;
	// Do not add a slash to file-like paths (rss.xml etc.)
	if (p.split('/').pop()?.includes('.')) return p;
	return p + '/';
}

// The key that links an entry to its translations. en files use their id; translated
// files set translationKey explicitly to the en id.
export function translationKeyOf(entry: { id: string; data: { translationKey?: string } }): string {
	return entry.data.translationKey ?? entry.id;
}

// Journal-specific chrome: layout labels, accountability headings, Rize recap labels.
type JournalDict = {
	back: string;
	written: string;
	tracked: string;
	pageTitle: string;
	pageSub: string;
	prev: string;
	next: string;
	noEarlier: string;
	latest: string;
	share: string;
	dayCaptured: string;
	entriesCount: (n: number) => string;
	acc: { targets: string; wins: string; losses: string; lessons: string };
	rize: { onScreen: string; partialDay: string; topCategories: string; topApps: string; trackedWith: string };
};

export const journalUi: Record<Locale, JournalDict> = {
	en: {
		back: 'all journal',
		written: 'written',
		tracked: 'tracked',
		pageTitle: 'Journal',
		pageSub: "Daily log: hours, what shipped, what didn't, what I learned. Newest first.",
		prev: 'previous',
		next: 'next',
		noEarlier: 'No earlier entry',
		latest: 'Latest entry',
		share: 'Share',
		dayCaptured: 'Day captured in Rize',
		entriesCount: (n) => `${n} ${n === 1 ? 'entry' : 'entries'}`,
		acc: { targets: 'Targets', wins: 'Wins', losses: 'Losses', lessons: 'Lessons' },
		rize: { onScreen: 'On screen', partialDay: 'partial day', topCategories: 'Top categories', topApps: 'Top apps & sites', trackedWith: 'Tracked with' },
	},
	pt: {
		back: 'todo o diário',
		written: 'escrito',
		tracked: 'registrado',
		pageTitle: 'Diário',
		pageSub: 'Registro diário: horas, o que foi entregue, o que não foi, o que aprendi. Mais recente primeiro.',
		prev: 'anterior',
		next: 'próximo',
		noEarlier: 'Nenhuma entrada anterior',
		latest: 'Entrada mais recente',
		share: 'Compartilhar',
		dayCaptured: 'Dia capturado no Rize',
		entriesCount: (n) => `${n} ${n === 1 ? 'entrada' : 'entradas'}`,
		acc: { targets: 'Metas', wins: 'Vitórias', losses: 'Derrotas', lessons: 'Lições' },
		rize: { onScreen: 'Na tela', partialDay: 'dia parcial', topCategories: 'Principais categorias', topApps: 'Principais apps e sites', trackedWith: 'Registrado com' },
	},
	de: {
		back: 'alle Einträge',
		written: 'geschrieben',
		tracked: 'erfasst',
		pageTitle: 'Tagebuch',
		pageSub: 'Tägliches Log: Stunden, was fertig wurde, was nicht, was ich gelernt habe. Neueste zuerst.',
		prev: 'vorheriger',
		next: 'nächster',
		noEarlier: 'Kein früherer Eintrag',
		latest: 'Neuester Eintrag',
		share: 'Teilen',
		dayCaptured: 'Tag in Rize erfasst',
		entriesCount: (n) => `${n} ${n === 1 ? 'Eintrag' : 'Einträge'}`,
		acc: { targets: 'Ziele', wins: 'Erfolge', losses: 'Rückschläge', lessons: 'Lektionen' },
		rize: { onScreen: 'Auf dem Bildschirm', partialDay: 'Teiltag', topCategories: 'Top-Kategorien', topApps: 'Top-Apps & Seiten', trackedWith: 'Erfasst mit' },
	},
};

export function useJournal(lang: Locale): JournalDict {
	return journalUi[lang] ?? journalUi[DEFAULT_LOCALE];
}
