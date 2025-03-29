const quotes = require("../_data/quotes.json");

module.exports = (req, res) => {
  // CORS 기본 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ★ Preflight 요청 명시적 처리
  if (req.method === "OPTIONS") {
    return res.writeHead(204).end();
  }

  if (req.method === "GET") {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    });
    res.end(JSON.stringify(randomQuote));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};