// Optional local QA proxy: production is read-only; writes stay on local Laravel.
import http from 'node:http';

const production = 'https://taydoautocar.vn';
const local = 'http://127.0.0.1:8000';
const allowed = /^\/api\/(services|service-categories|products|cars|posts)(\/[^/?]+)?\/?$/;
const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost');
  const readProduction = req.method === 'GET' && allowed.test(path.pathname);
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const headers = { accept: 'application/json' };
    if (!readProduction) {
      for (const key of ['content-type', 'cookie', 'x-csrf-token']) {
        if (req.headers[key]) headers[key] = req.headers[key];
      }
    }
    const upstream = await fetch(`${readProduction ? production : local}${path.pathname}${path.search}`, {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    res.writeHead(upstream.status, { 'content-type': upstream.headers.get('content-type') || 'application/json', 'cache-control': 'no-store' });
    res.end(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    res.writeHead(502, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'QA API unavailable. Production writes are disabled.' }));
  }
});
server.listen(8001, '127.0.0.1', () => console.log('Read-only production QA proxy: http://127.0.0.1:8001/api'));
