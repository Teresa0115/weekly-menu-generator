const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const file = path.resolve(__dirname, 'menu_template.html');
  await page.goto(`file:///${file}`, { waitUntil: 'networkidle0' });

  await page.screenshot({ path: 'menu_this_week.png' });
  await browser.close();
  console.log('圖片已產生：menu_this_week.png');
})();
