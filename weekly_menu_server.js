const http = require('http');
const fs   = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  if (req.method === 'GET' && req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'weekly_menu_editor.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  if (req.method === 'POST' && req.url === '/generate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { categories, config } = JSON.parse(body);

        // 計算圖片高度（依內容多寡調整）
        const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
        const height = Math.max(630, 320 + categories.length * 50 + totalItems * 30);

        let template = fs.readFileSync(path.join(__dirname, 'weekly_menu_template.html'), 'utf8');
        const injection = `<script>
  window.__CONFIG__     = ${JSON.stringify(config)};
  window.__CATEGORIES__ = ${JSON.stringify(categories)};
<\/script>`;
        template = template.replace('</head>', injection + '</head>');

        const tmpFile = path.join(__dirname, '_weekly_menu_gen.html');
        fs.writeFileSync(tmpFile, template);

        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height });
        await page.goto(`file:///${tmpFile}`, { waitUntil: 'networkidle0' });
        // 等待字體加載完成
        await page.waitForTimeout(2000);
        const screenshot = await page.screenshot({
          fullPage: false,
          clip: { x: 0, y: 0, width: 1200, height }
        });

        // 儲存到檔案系統並返回 Base64 用於下載
        fs.writeFileSync(path.join(__dirname, 'weekly_menu_output.png'), screenshot);
        global.lastScreenshot = screenshot;

        await browser.close();

        const imageBase64 = screenshot.toString('base64');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, image: imageBase64 }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/download') {
    if (global.lastScreenshot) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="weekly_menu.png"'
      });
      res.end(global.lastScreenshot);
    } else {
      res.writeHead(404); res.end('尚未產生圖片');
    }
    return;
  }

  res.writeHead(404); res.end();
});

server.listen(PORT, () => {
  console.log(`✅ 每週菜單產生器啟動：http://localhost:${PORT}`);
  console.log('   打開瀏覽器進入上方網址即可使用');
});
