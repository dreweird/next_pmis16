// proxy-server.js
const http = require('http');
const httpProxy = require('http-proxy');

const TARGET = process.env.TARGET || 'http://localhost:3000';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const proxy = httpProxy.createProxyServer({ target: TARGET, changeOrigin: true });

proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (!res.headersSent) {
    res.writeHead(502);
  }
  res.end('Bad gateway');
});

const server = http.createServer((req, res) => {
  const remote = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(new Date().toISOString(), 'Incoming', remote, req.method, req.url);

  if (req.method === 'POST') {
    // Collect POST body for troubleshooting (beware of sensitive data)
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 1e6) {
        // Too big — stop collecting
        req.socket.destroy();
      }
    });
    req.on('end', () => {
      console.log('POST body:', body);
      // Forward the request after logging by creating a new request stream
      const headers = { ...req.headers };
      const forwardReq = http.request(
        TARGET + req.url,
        {
          method: req.method,
          headers,
        },
        (forwardRes) => {
          res.writeHead(forwardRes.statusCode, forwardRes.headers);
          forwardRes.pipe(res, { end: true });
        }
      );
      forwardReq.on('error', (err) => {
        console.error('Forward error:', err);
        res.writeHead(502);
        res.end('Bad gateway');
      });
      forwardReq.write(body);
      forwardReq.end();
    });
  } else {
    // Non-POST requests are proxied normally
    proxy.web(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Proxy listening on :${PORT} -> ${TARGET}`);
});
