import path from "path";

let tokenizer: any = null;
let initPromise: Promise<any> | null = null;

export async function getTokenizer() {
  if (tokenizer) return tokenizer;
  if (initPromise) return initPromise;

  initPromise = new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const kuromoji = require("kuromoji");
    const dicPath = path.join(process.cwd(), "node_modules", "kuromoji", "dict");
    kuromoji.builder({ dicPath }).build((err: any, tok: any) => {
      if (err) reject(err);
      else { tokenizer = tok; resolve(tok); }
    });
  });

  return initPromise;
}

const EXCLUDED_POS_DETAIL = new Set([
  "非自立",    // ている → てる, られる → られ  etc.
  "助数詞",    // 匹、回、個
  "代名詞",    // これ、それ、あれ
  "接尾",      // ～さん、～化
  "接頭",      // お～、ご～
  "副詞可能",  // すぐ、もっと (nouns that act as adverbs)
]);

export async function tokenizeKuromoji(text: string): Promise<string[]> {
  const tok = await getTokenizer();
  const tokens = tok.tokenize(text);
  const words: string[] = [];

  for (const t of tokens) {
    const pos: string = t.pos;
    const posDetail1: string = t.pos_detail_1 || "";
    const posDetail2: string = t.pos_detail_2 || "";
    const surface: string = t.surface_form;

    // Strict filtering: mostly nouns, proper nouns, foreign words
    const isNoun = pos === "名詞";
    const isProperNoun = pos === "名詞" && posDetail1 === "固有名詞";
    const isForeign = pos === "名詞" && posDetail1 === "外国語";
    const isAlphabet = /^[a-zA-Z0-9]+$/.test(surface) && surface.length >= 3;

    // Exclude by POS detail for ALL tokens
    if (EXCLUDED_POS_DETAIL.has(posDetail1) || EXCLUDED_POS_DETAIL.has(posDetail2)) continue;

    // Exclude single-character non-kanji
    if (surface.length === 1 && !/[\u4E00-\u9FFF]/.test(surface)) continue;

    let word: string | null = null;

    if (isProperNoun || isForeign) {
      // Always include proper nouns and foreign words
      word = surface;
    } else if (isNoun) {
      // General nouns: use surface form
      word = surface;
    } else if (isAlphabet) {
      // Standalone alphabet/number words 3+ chars
      word = surface;
    }

    // Exclude very short garbage
    if (word && word.length >= 2) {
      words.push(word);
    }
  }

  return words;
}
