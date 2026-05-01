const fs = require("fs");

const harPath = "C:/Users/maeba/Desktop/lailala/www.youtube.com.har";
const data = fs.readFileSync(harPath, "utf8");

// HAR entries are in log.entries[].request.url and log.entries[].request.postData.text
const entries = data.split('"request"\n');
let found = 0;

entries.slice(1).forEach((entry) => {
  if (found >= 3) return;
  
  const urlMatch = entry.match(/"url":\s*"([^"]*youtubei\/v1\/next[^"]*)"/);
  const methodMatch = entry.match(/"method":\s*"([^"]+)"/);
  if (!urlMatch) return;
  
  const url = urlMatch[1].replace(/\\u0026/g, "&");
  const method = methodMatch ? methodMatch[1] : "?";
  
  // Find request body (can be in "text" or base64 encoded)
  // Look for "postData"
  const postDataBlock = entry.match(/"postData":\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s);
  let bodyText = null;
  
  if (postDataBlock) {
    const textMatch = postDataBlock[0].match(/"text":\s*"((?:\\"|[^"])*)"/);
    if (textMatch) {
      bodyText = textMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\');
    }
    
    // Or base64
    const encodingMatch = postDataBlock[0].match(/"encoding":\s*"([^"]+)"/);
    if (encodingMatch && encodingMatch[1] === "base64") {
      const base64Match = postDataBlock[0].match(/"text":\s*"([^"]+)"/);
      if (base64Match) {
        bodyText = Buffer.from(base64Match[1], "base64").toString("utf8");
      }
    }
  }

  // Try to find body in "text" field directly (within request body structure)
  if (!bodyText) {
    // Look for a large "text" field that looks like JSON
    const bigTextMatch = entry.match(/"text":\s*"(\{[^"]+\})"/);
    if (bigTextMatch) {
      try {
        const raw = bigTextMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        JSON.parse(raw); // validate
        bodyText = raw;
      } catch {}
    }
  }
  
  if (bodyText) {
    console.log(`\n=== ${method} ${url.slice(0, 100)} ===`);
    try {
      const parsed = JSON.parse(bodyText);
      if (parsed.continuation) {
        console.log("  continuation:", parsed.continuation.slice(0, 200));
      }
      console.log(JSON.stringify(parsed, null, 2).slice(0, 1000));
    } catch {
      console.log("  body (raw):", bodyText.slice(0, 500));
    }
    found++;
  }
});

if (found === 0) {
  console.log("No youtubei/v1/next requests found in HAR");
}
