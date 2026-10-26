// Static server for the Playwright browser tests. Serves the repository root
// so test pages can load ../dist and ../src exactly as they do in development.
//
// Two test hooks imitate real servers:
// - A .css request without Accept: text/css gets a JavaScript module, as the
//   Vite dev server does, to catch code that fetches CSS like a script.
// - ?serve-as=<type> labels the response with that Content-Type.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.E2E_PORT || 8855);
const types = {
  '.htm': 'text/html',
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const file = path.join(repoRoot, decodeURIComponent(url.pathname));
    if (
      !file.startsWith(repoRoot + path.sep) ||
      !fs.existsSync(file) ||
      fs.statSync(file).isDirectory()
    ) {
      res.writeHead(404).end();
      return;
    }
    const type = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
    if (url.searchParams.has('serve-as')) {
      res.writeHead(200, { 'Content-Type': url.searchParams.get('serve-as') });
    } else if (type === 'text/css' && !req.headers.accept?.includes('text/css')) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end('const __vite__css = ".toggle{}"; export default __vite__css;');
      return;
    } else {
      res.writeHead(200, { 'Content-Type': type });
    }
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`e2e server on http://127.0.0.1:${port}`);
  });
