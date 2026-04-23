const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 首頁
  if (req.method === 'GET' && req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'menu_editor.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // 產生圖片
  if (req.method === 'POST' && req.url === '/generate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { categories, date, brand, title, subtitle, footer } = JSON.parse(body);

        // 計算圖片高度（依內容多寡調整）
        const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
        const height = Math.max(630, 320 + categories.length * 50 + totalItems * 30);

        // 注入配置和類別到模版
        let template = fs.readFileSync(path.join(__dirname, 'menu_template.html'), 'utf8');
        const injection = `<script>
  window.__CONFIG__ = ${JSON.stringify({ brand, date, title, subtitle, footer })};
  window.__CATEGORIES__ = ${JSON.stringify(categories)};
<\/script>`;
        template = template.replace('</head>', injection + '</head>');
        fs.writeFileSync(path.join(__dirname, 'menu_template_gen.html'), template);

        // 截圖
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height });
        const file = path.resolve(__dirname, 'menu_template_gen.html');
        await page.goto(`file:///${file}`, { waitUntil: 'networkidle0' });
        await page.screenshot({
          path: path.join(__dirname, 'menu_this_week.png'),
          fullPage: false,
          clip: { x: 0, y: 0, width: 1200, height }
        });
        await browser.close();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // 下載圖片
  if (req.method === 'GET' && req.url === '/download') {
    const imgPath = path.join(__dirname, 'menu_this_week.png');
    if (fs.existsSync(imgPath)) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="menu_this_week.png"'
      });
      fs.createReadStream(imgPath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('尚未產生圖片');
    }
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`✅ 菜單產生器已啟動：http://localhost:${PORT}`);
  console.log('   打開瀏覽器進入上方網址即可使用');
});
