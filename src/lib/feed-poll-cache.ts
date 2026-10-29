// 新着コメント確認のポーリング用・超短命キャッシュ。
//
// 各タブが 60 秒ごとに /api/comments/ を叩くが、これは毎回 YouTube への
// 実取得（0.7〜0.9 秒）を伴っていた。タブ数だけ上流を叩くのは無駄なので、
// 同一（videoId, sortBy, filterYear）の結果を 60 秒だけ共有する。
// 通常のフィード表示や続き読み込みはこのキャッシュを通さない（常に最新を返す）。

type Entry = { at: number; value: unknown };

const TTL_MS = 60_000;
const MAX_ENTRIES = 20;

const cache = new Map<string, Entry>();
const inflight = new Map<string, Promise<unknown>>();

export async function getFeedPoll<T>(
  key: string,
  load: () => Promise<T>
): Promise<{ value: T; fromCache: boolean }> {
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && now - hit.at < TTL_MS) {
    return { value: hit.value as T, fromCache: true };
  }

  // 同時に複数タブが来ても YouTube へは 1 回だけ。
  const pending = inflight.get(key);
  if (pending) {
    return { value: (await pending) as T, fromCache: true };
  }

  const promise = load()
    .then((value) => {
      cache.set(key, { at: Date.now(), value });
      if (cache.size > MAX_ENTRIES) {
        let oldestKey: string | null = null;
        let oldestAt = Infinity;
        for (const [k, v] of cache) {
          if (v.at < oldestAt) {
            oldestAt = v.at;
            oldestKey = k;
          }
        }
        if (oldestKey) cache.delete(oldestKey);
      }
      return value;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
  return { value: await promise, fromCache: false };
}
