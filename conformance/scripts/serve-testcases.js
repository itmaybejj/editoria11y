#!/usr/bin/env node

/**
 * Local HTTP server for ACT conformance testing.
 *
 * Serves:
 *   /testcases/{ruleId}/{testcaseId}.html  → cached test case HTML
 *   /dist/*                                → ed11y built files from project root
 *   /test-assets/*                         → placeholder (assets not needed for DOM analysis)
 *
 * Usage:
 *   node conformance/scripts/serve-testcases.js           # default port 8844
 *   node conformance/scripts/serve-testcases.js --port=9000
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');
const CACHE_DIR = join(__dirname, '..', '.cache');

const portArg = process.argv.find((a) => a.startsWith('--port='));
const PORT = portArg ? Number.parseInt(portArg.split('=')[1], 10) : 8844;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

function getMime(filePath) {
  return MIME_TYPES[extname(filePath)] || 'application/octet-stream';
}

// 1x1 transparent PNG for placeholder images
const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAB' +
    'Nl7BcQAAAABJRU5ErkJggg==',
  'base64',
);

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  try {
    // Serve cached test case pages
    if (pathname.startsWith('/testcases/')) {
      const filePath = join(CACHE_DIR, 'pages', pathname.replace('/testcases/', ''));
      const content = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': getMime(filePath) });
      res.end(content);
      return;
    }

    // Serve ed11y dist files
    if (pathname.startsWith('/dist/')) {
      const filePath = join(PROJECT_ROOT, pathname);
      const content = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': getMime(filePath) });
      res.end(content);
      return;
    }

    // Placeholder for test assets — return a transparent pixel for images,
    // empty content for everything else. Ed11y checks DOM attributes, not
    // rendered pixels, so this is fine for conformance testing.
    if (pathname.startsWith('/test-assets/')) {
      const ext = extname(pathname);
      if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(PLACEHOLDER_PNG);
      } else if (ext === '.mp4' || ext === '.webm') {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        res.end(Buffer.alloc(0));
      } else {
        res.writeHead(200, { 'Content-Type': getMime(pathname) });
        res.end('');
      }
      return;
    }

    // Health check
    if (pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not found: ${pathname}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`File not found: ${pathname}`);
    } else {
      console.error(`Error serving ${pathname}:`, err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`ACT test case server running at http://localhost:${PORT}`);
  console.log(`  Test cases: /testcases/{ruleId}/{testcaseId}.html`);
  console.log(`  Ed11y dist: /dist/*`);
  console.log(`  Assets:     /test-assets/* (placeholders)`);
});

export { server, PORT };
