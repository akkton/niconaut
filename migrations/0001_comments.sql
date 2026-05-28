-- Public comment threads, one per post path.
-- post_path is the full pathname (e.g. /posts/math-to-ten/, /de/posts/math-to-ten/)
-- so the en/pt/de variants get their own threads automatically.

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_path TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email_hash TEXT,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'visible',
  parent_id TEXT,
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_comments_post_path_visible
  ON comments (post_path, status, created_at);

CREATE INDEX IF NOT EXISTS idx_comments_ip_recent
  ON comments (ip_hash, created_at);

CREATE INDEX IF NOT EXISTS idx_comments_status
  ON comments (status, created_at);
