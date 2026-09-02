import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const publicDir = join(root, 'public');
const outputDir = join(root, 'dist', 'server');
const entries = [
  ['/', 'index.html', 'text/html; charset=utf-8'],
  ['/index.html', 'index.html', 'text/html; charset=utf-8'],
  ['/styles.css', 'styles.css', 'text/css; charset=utf-8'],
  ['/techpack.css', 'techpack.css', 'text/css; charset=utf-8'],
  ['/app.js', 'app.js', 'text/javascript; charset=utf-8'],
];

const files = Object.fromEntries(await Promise.all(entries.map(async ([route, file, type]) => [route, {
  body: await readFile(join(publicDir, file), 'utf8'),
  type,
}])));

const worker = `const files = ${JSON.stringify(files)};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const file = files[url.pathname] || files['/'];
    return new Response(file.body, {
      headers: {
        'content-type': file.type,
        'cache-control': url.pathname === '/' ? 'no-cache' : 'public, max-age=3600',
        'x-content-type-options': 'nosniff'
      }
    });
  }
};
`;

await rm(join(root, 'dist'), { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, 'index.js'), worker);
console.log('Built Cloudflare Worker output in dist/server/index.js');
