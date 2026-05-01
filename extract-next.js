const fs = require("fs");
const d = fs.readFileSync("C:/Users/maeba/Desktop/lailala/www.youtube.com.har", "utf8");

// Find youtubei/v1/next and extract postData text
let idx = 0;
let count = 0;

while (count < 3) {
  const pos = d.indexOf("youtubei/v1/next", idx);
  if (pos < 0) break;
  
  const pre = d.substring(Math.max(0, pos - 500), pos);
  const post = d.substring(pos, pos + 5000);
  
  // Find postData structure
  const pdMatch = post.match(/"postData"\s*:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s);
  if (pdMatch) {
    const pdStr = pdMatch[0];
    // Extract "text" field from postData
    const textMatch = pdStr.match(/"text"\s*:\s*"((?:[^"\\]|\\.)*)"/s);
    if (textMatch) {
      let text = textMatch[1];
      text = text.replace(/\\"/g, '"').replace(/\\n/g, '').replace(/\\t/g, '');
      try {
        const parsed = JSON.parse(text);
        console.log(`=== next request #${count} ===`);
        console.log(JSON.stringify(parsed, null, 2).slice(0, 1200));
        console.log();
        count++;
      } catch {
        console.log("  (not valid JSON:", text.slice(0, 100), ")");
      }
    } else {
      console.log("postData found but no text field");
      console.log(pdStr.slice(0, 200));
    }
  } else {
    console.log("no postData found in chunk", count);
  }
  
  idx = pos + 100;
}

if (count === 0) {
  console.log("No youtubei/v1/next requests with valid postData found");
}
