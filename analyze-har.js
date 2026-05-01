const fs = require("fs");

const d = fs.readFileSync("C:/Users/maeba/Desktop/lailala/www.youtube.com.har", "utf8");

// Find all youtubei API requests
const entries = d.split('"request"');
let found = 0;

for (let i = 0; i < entries.length; i++) {
  const entry = entries[i];
  const urlMatch = entry.match(/"url":\s*"([^"]*youtubei[^"]*)"/);
  const methodMatch = entry.match(/"method":\s*"([^"]+)"/);
  if (!urlMatch) continue;
  
  const url = urlMatch[1].replace(/\\u0026/g, "&");
  const method = methodMatch ? methodMatch[1] : "?";
  
  if (url.includes("next") || url.includes("comment") || url.includes("repl")) {
    console.log("--- " + method + " " + url.slice(0, 150));
    
    // Find the postData if any
    const postDataMatch = entry.match(/"text":\s*"([^"]+)"/);
    if (postDataMatch) {
      try {
        const decoded = JSON.parse(postDataMatch[1]);
        console.log("   body:", JSON.stringify(decoded).slice(0, 500));
      } catch {
        console.log("   raw text:", postDataMatch[1].slice(0, 300));
      }
    }
    found++;
    if (found >= 5) break;
  }
}
