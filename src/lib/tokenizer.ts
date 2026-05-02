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
  "非自立",
  "助数詞",
  "代名詞",
  "接尾",
  "接頭",
  "副詞可能",
]);

function pushIfValid(words: string[], word: string) {
  if (word.length >= 2 && !/^\d+$/.test(word)) {
    words.push(word);
  }
}

export async function tokenizeKuromoji(text: string): Promise<string[]> {
  const tok = await getTokenizer();

  // Protect patterns like "YAJU&U" before tokenization
  const protectedPatterns: string[] = [];
  const processedText = text.replace(/[a-zA-Z0-9]+(?:&[a-zA-Z0-9]+)+/g, (match) => {
    protectedPatterns.push(match);
    return `PROTECTED_${protectedPatterns.length - 1}_`;
  });

  const tokens = tok.tokenize(processedText);
  const words: string[] = [];
  let nounBuffer = "";

  for (const t of tokens) {
    const pos: string = t.pos;
    const posDetail1: string = t.pos_detail_1 || "";
    const posDetail2: string = t.pos_detail_2 || "";
    const surface: string = t.surface_form;

    // Exclude by POS detail: flush buffer
    if (EXCLUDED_POS_DETAIL.has(posDetail1) || EXCLUDED_POS_DETAIL.has(posDetail2)) {
      if (nounBuffer) {
        pushIfValid(words, nounBuffer);
        nounBuffer = "";
      }
      continue;
    }

    const isNoun = pos === "名詞";
    const isForeign = isNoun && posDetail1 === "外国語";

    // Check if it's a protected pattern (YAJU&U etc.)
    const protectedMatch = surface.match(/^PROTECTED_(\d+)_$/);
    if (protectedMatch) {
      if (nounBuffer) {
        pushIfValid(words, nounBuffer);
        nounBuffer = "";
      }
      const idx = parseInt(protectedMatch[1], 10);
      if (protectedPatterns[idx]) {
        pushIfValid(words, protectedPatterns[idx]);
      }
      continue;
    }

    // Single character non-kanji breaks noun chain
    if (surface.length === 1 && !/[\u4E00-\u9FFF]/.test(surface)) {
      if (nounBuffer) {
        pushIfValid(words, nounBuffer);
        nounBuffer = "";
      }
      continue;
    }

    // Accumulate nouns into compound
    if (isNoun || isForeign) {
      nounBuffer += surface;
    } else {
      if (nounBuffer) {
        pushIfValid(words, nounBuffer);
        nounBuffer = "";
      }
    }
  }

  if (nounBuffer) {
    pushIfValid(words, nounBuffer);
  }

  return words;
}
