const quotes = require("../_data/quotes.json");

module.exports = (req, res) => {
  // CORS 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (req.method === "GET") {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Vercel 공식 방식: writeHead + end (status() 사용 X)
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
