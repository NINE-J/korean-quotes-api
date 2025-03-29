const quotes = require("../_data/quotes.json");

module.exports = (req, res) => {
  // CORS 기본 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 1. URL 파싱 (기존 파라미터 유지)
  const parsedUrl = url.parse(req.url, true);
  const queryParams = parsedUrl.query;

  // 2. 타임스탬프 파라미터 제외한 나머지 파라미터 유지
  if (queryParams.timestamp) {
    delete queryParams.timestamp; // 캐시 버스팅용 파라미터는 무시
  }

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