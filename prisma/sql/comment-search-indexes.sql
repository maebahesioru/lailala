-- 検索（ILIKE '%q%'）用の trigram インデックス。
-- Prisma の `contains` + `mode: "insensitive"` は ILIKE '%...%' に変換されるため、
-- btree ではインデックスが効かず全件走査＋ソートになっていた（実測 2.3〜3.7 秒）。
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS comment_cache_content_trgm_idx
  ON comment_cache USING gin (content gin_trgm_ops);

CREATE INDEX IF NOT EXISTS comment_cache_author_name_trgm_idx
  ON comment_cache USING gin (author_name gin_trgm_ops);
