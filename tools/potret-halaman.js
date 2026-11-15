// Potret halaman penuh di lebar 375px setelah digulir pelan (supaya gambar lazy dan animasi muncul), plus cek console.
// Pakai: NODE_PATH=$(npm root -g) node tools/potret-halaman.js public <folder-hasil> preschool.html primary.html
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(process.argv[2]), OUT = process.argv[3], pages = process.argv.slice(4);
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webm': 'video/webm', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
srv.listen(0, async () => {
  const port = srv.address().port, b = await chromium.launch();
  for (const p of pages) {
    const ctx = await b.newContext({ viewport: { width: 375, height: 800 }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage(); const err = [], luar = [];
    pg.on('console', m => { if (m.type() === 'error') err.push(m.text().slice(0, 150)); });
    pg.on('pageerror', e => err.push('pageerror ' + String(e).slice(0, 150)));
    pg.on('request', q => { if (!q.url().startsWith('http://localhost')) luar.push(q.url().slice(0, 70)); });
    await pg.goto(`http://localhost:${port}/${p}`, { waitUntil: 'load' });
    const h = await pg.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 400) { await pg.evaluate(v => window.scrollTo(0, v), y); await pg.waitForTimeout(120); }
    await pg.evaluate(() => window.scrollTo(0, 0)); await pg.waitForTimeout(400);
    const m = await pg.evaluate(() => ({ ovf: document.documentElement.scrollWidth - innerWidth, tinggi: document.documentElement.scrollHeight, rusak: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.getAttribute('src').slice(0, 60)), tersembunyi: [...document.querySelectorAll('main section')].filter(s => getComputedStyle(s).opacity === '0').length }));
    await pg.screenshot({ path: path.join(OUT, p.replace('.html', '') + '-375.png'), fullPage: true });
    console.log(p, JSON.stringify(m), 'console:', err.length ? err : 0, 'permintaan ke luar:', [...new Set(luar)]);
    await ctx.close();
  }
  await b.close(); srv.close();
});
