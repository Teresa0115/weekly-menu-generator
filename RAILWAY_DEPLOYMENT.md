# Railway 部署指南 · Weekly Menu Generator

通用版本（weekly_menu_server）部署到 Railway

---

## 前置準備

1. **Railway 帳戶** — [railway.app](https://railway.app) 註冊
2. **GitHub 帳戶** — 用來連接 GitHub Repo
3. **Node.js** — 本地環境已有（用於測試）

---

## 部署步驟

### 步驟 1：準備 GitHub Repo

**A. 初始化 Git（如果還沒做）**
```bash
cd C:\users\user\claude-practice
git init
git add .
git commit -m "Initial commit: Weekly Menu Generator"
```

**B. 上傳到 GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/weekly-menu-generator.git
git branch -M main
git push -u origin main
```

### 步驟 2：在 Railway 上部署

**A. 進入 Railway 後台**
1. 訪問 [railway.app](https://railway.app)
2. 登入帳戶

**B. 新建 Project**
1. 點「New Project」
2. 選「Deploy from GitHub repo」
3. 連接 GitHub（授權）
4. 選擇 `weekly-menu-generator` 倉庫

**C. 自動部署配置**
1. Railway 會自動偵測 Node.js 專案
2. 確認 `package.json` 中 `"start": "node weekly_menu_server.js"`
3. 點「Deploy」

**D. 設定環境變數（如需要）**
1. 進入 Project Settings
2. 環境變數（如果需要）
3. 暫時不需要特殊設定

### 步驟 3：取得公開 URL

部署完成後，Railway 會自動分配一個公開 URL：
```
https://weekly-menu-{random}.railway.app
```

### 步驟 4：測試部署

在瀏覽器打開：
```
https://weekly-menu-{random}.railway.app
```

應該看到菜單產生器界面

---

## 部署後檢查清單

- [ ] 頁面正常加載
- [ ] 可以填寫菜單資訊
- [ ] 可以產生圖片
- [ ] 可以下載圖片
- [ ] 所有配色主題正常

---

## 常見問題

### 部署失敗？

**檢查：**
1. `package.json` 是否正確
2. `weekly_menu_server.js` 是否存在
3. GitHub repo 是否公開或給 Railway 授權

### 圖片生成失敗？

Puppeteer 在 Railway 上可能需要額外的系統依賴。

**解決方案：**
在專案根目錄創建 `Procfile`：
```
web: node weekly_menu_server.js
```

或在 Railway 設定中添加：
```
BUILD_COMMAND: npm install
START_COMMAND: node weekly_menu_server.js
```

### 自訂域名

如果想用自己的域名（如 menu.example.com）：

1. Railway 後台 → Project Settings
2. Domains → Add Custom Domain
3. 添加你的域名
4. 按照指示修改 DNS 記錄

---

## 版本管理

每次本地更新後，只需：
```bash
git add .
git commit -m "Update: 描述變更內容"
git push origin main
```

Railway 會自動重新部署！

---

## 限制和成本

**Railway 免費方案：**
- 月度額度：$5（大約免費）
- 限制：中等流量（個人/小團隊使用足夠）

**超過額度：**
- 自動停止，或需升級到付費方案
- 付費從 $5/月起

---

## 維護和監控

### 查看日誌
Railway 後台 → Deployments → View Logs

### 自動重啟
Railway 預設如果應用崩潰會自動重啟

### 更新依賴
如果 Puppeteer 版本有更新：
```bash
npm update puppeteer
git add package*.json
git commit -m "Update: Puppeteer version"
git push
```

---

## 後續改進方向

部署完成後，可以考慮：
- [ ] 添加用戶帳戶系統
- [ ] 保存菜單歷史
- [ ] 統計使用數據
- [ ] 付費訂閱模式

---

**需要幫助？** 檢查 Railway 文檔：[docs.railway.app](https://docs.railway.app)
