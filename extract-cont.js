const fs = require("fs");

const harPath = "C:/Users/maeba/Desktop/lailala/www.youtube.com.har";
const data = fs.readFileSync(harPath, "utf8");

// Find all "continuation" occurrences and print context
let idx = 0;
let cnt = 0;

while (cnt < 10) {
  idx = data.indexOf('"continuation"', idx);
  if (idx < 0) break;
  
  const start = Math.max(0, idx - 200);
  const end = Math.min(data.length, idx + 800);
  const chunk = data.substring(start, end);
  
  console.log(`\n=== chunk #${cnt} at pos ${idx} ===`);
  console.log(chunk);
  
  idx += 100;
  cnt++;
}

if (cnt === 0) {
  console.log("No continuation tokens found");
}
