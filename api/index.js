const quotes = require("../_data/quotes.json");
const url = require('url');

module.exports = (req, res) => {
  // CORS 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  // 1. URL 파싱 (타임스탬프 무시)
  const parsedUrl = url.parse(req.url, true);
  const queryParams = parsedUrl.query;

  // 2. 타임스탬프 파라미터 제거 (캐시 버스팅용이므로 무시)
  if (queryParams.timestamp) {
    delete queryParams.timestamp;
  }

  // 3. 실제 로직 처리
  if (req.method === "GET") {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    });
    res.end(JSON.stringify(randomQuote));
  } else if (req.method === "OPTIONS") {
    res.writeHead(204).end(); // Preflight 처리
  } else {
    res.writeHead(404).end("Not Found");
  }
};