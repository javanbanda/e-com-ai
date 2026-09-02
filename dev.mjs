import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const server = createServer(async (request, response) => {
  const path = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const safe = path.replace(/\.\./g, '');
  try {
    const file = join(root, 'public', safe);
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': types[file.slice(file.lastIndexOf('.'))] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404); response.end('Not found');
  }
});
server.listen(4174, () => console.log('Shopify Growth AI: http://localhost:4174'));
