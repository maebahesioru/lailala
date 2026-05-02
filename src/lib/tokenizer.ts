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

export async function tokenizeKuromoji(text: string): Promise<string[]> {
  const tok = await getTokenizer();
  const tokens = tok.tokenize(text);
  const words: string[] = [];

  for (const t of tokens) {
    const pos: string = t.pos;
    const posDetail1: string = t.pos_detail_1 || "";
    const surface: string = t.surface_form;

    // Accept meaningful parts of speech only
    const allowedPos = ["名詞", "動詞", "形容詞", "副詞", "感動詞", "連体詞"];
    if (!allowedPos.includes(pos)) continue;

    // Exclude non-independent nouns (助数詞, 非自立, etc.)
    if (pos === "名詞" && ["助数詞", "非自立", "代名詞", "接尾"].includes(posDetail1)) continue;

    // Exclude single-character words (except kanji)
    if (surface.length === 1 && !/[\u4E00-\u9FFF]/.test(surface)) continue;

    // For verbs/adjectives, use basic form (dictionary form) if available
    const word = (t.basic_form && t.basic_form !== "*") ? t.basic_form : surface;

    if (word && word.length >= 2) {
      words.push(word);
    }
  }

  return words;
}
