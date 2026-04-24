# 每週菜單產生器 — 完整教學指南

**專案狀態**：✅ 完成  
**上線日期**：2026-04-23  
**最後更新**：2026-04-24

---

## 📌 專案概述

一個完全自動化的線上菜單生成工具，讓烘焙店、咖啡館、餐廳可以快速製作專業的週菜單圖片。

### 主要特色
- 🎨 5 種配色主題可選
- 📝 完全自訂品牌信息
- 🏷️ 多類別菜單結構
- 📱 支援商品描述
- ⬇️ 一鍵下載 PNG 圖片
- 🚀 零部署成本（Railway 免費方案）

---

## 🌐 線上訪問

```
https://weekly-menu-generator-production.up.railway.app
```

打開連結即可使用，無需登入或安裝任何軟體。

---

## 📖 使用說明

### 步驟 1：填寫品牌信息
| 欄位 | 說明 | 範例 |
|------|------|------|
| 品牌名稱 | 店家名稱 | Nosif Pastry |
| 菜單標題 | 主標題 | 本週菜單 |
| 副標 | 補充說明 | 限量供應｜售完為止 |
| 日期 | 菜單日期 | 2026-04-23 至 2026-04-29 |
| 頁尾聯絡資訊 | 電話、地址等 | 電話：02-1234-5678 |

### 步驟 2：選擇配色主題
- 🔵 **法國藍** (French Blue) — 專業、正式
- 🟤 **暖奶茶** (Warm Tea) — 溫暖、舒適
- 🟢 **森林綠** (Forest Green) — 自然、現代
- ⬛ **深墨黑** (Dark Black) — 高級、冷調
- 🌸 **玫瑰粉** (Rose Pink) — 優雅、甜蜜

### 步驟 3：建立菜單結構

**新增類別**
1. 點「+ 新增類別」
2. 輸入類別名稱（例：鹹派、可頌、飲品）

**新增商品**
1. 在類別下點「+ 新增品項」
2. 填入：
   - **品項名稱** — 商品名稱
   - **價格** — 售價
   - **描述（可選）** — 口感、成分等說明

### 步驟 4：產生圖片
1. 點「產生圖片」按鈕
2. 等待 5-10 秒（伺服器處理中）
3. 看到 ✅ 表示成功

### 步驟 5：下載圖片
1. 點「下載圖片」按鈕
2. PNG 檔案自動下載
3. 可用於社群媒體、列印、分享

---

## 🛠️ 技術架構

### 前端
- HTML + CSS + Vanilla JavaScript
- 無框架、無編譯步驟
- 完全客戶端邏輯

### 後端
- Node.js HTTP 伺服器
- Puppeteer 無頭瀏覽器
- 實時 HTML → PNG 轉換

### 部署
- Railway 雲端平台
- 自動化 CI/CD（GitHub → Railway）
- 無伺服器成本（免費方案）

### 字體
- **標題字體**：Playfair Display（英文）+ Noto Sans TC（中文）
- **內文字體**：Noto Sans TC（繁體中文）
- **來源**：Google Fonts CDN

---

## 📁 檔案結構

```
weekly-menu-generator/
├── weekly_menu_server.js          # 後端伺服器
├── weekly_menu_editor.html        # 編輯器界面
├── weekly_menu_template.html      # 菜單樣板
├── package.json                   # 依賴管理
├── .gitignore                     # Git 忽略規則
├── RAILWAY_DEPLOYMENT.md          # 部署指南
├── WEEKLY_MENU_PROJECT.md         # 專案文檔
└── TUTORIAL.md                    # 本教學文檔
```

### 核心檔案說明

#### weekly_menu_server.js
- 啟動 HTTP 伺服器（預設 3001 端口）
- 提供編輯器主頁
- 處理菜單生成請求（POST /generate）
- 返回 Base64 編碼 PNG

#### weekly_menu_editor.html
- 編輯器使用界面
- 品牌設定表單
- 菜單結構管理
- 配色主題選擇器

#### weekly_menu_template.html
- 菜單視覺設計
- 響應式版面
- CSS 樣式定義
- JavaScript 動態渲染

#### package.json
```json
{
  "name": "weekly-menu-generator",
  "version": "1.0.0",
  "scripts": {
    "start": "node weekly_menu_server.js"
  },
  "dependencies": {
    "puppeteer": "^24.42.0"
  }
}
```

---

## 🚀 部署步驟

### 前置條件
1. GitHub 帳戶
2. Railway 帳戶（railway.app）
3. 將專案上傳到 GitHub

### 部署流程

**1. 在 Railway 建立新專案**
- 訪問 railway.app
- 點「New Project」
- 選「Deploy from GitHub repo」

**2. 連接 GitHub**
- 授權 Railway 存取你的 GitHub
- 選擇 `weekly-menu-generator` 倉庫

**3. 自動部署**
- Railway 自動偵測 Node.js 專案
- 執行 `npm install`
- 執行 `node weekly_menu_server.js`

**4. 取得公開 URL**
- Railway 儀表板 → Deployments
- 複製公開 URL（格式：`https://weekly-menu-{random}.railway.app`）

**5. 自訂域名（選擇性）**
- Railway Settings → Domains
- 添加自訂域名（需 DNS 配置）

---

## 📝 常見問題

### Q: 為什麼生成圖片很慢？
**A**: 首次生成需要 5-10 秒（Puppeteer 啟動時間）。這是正常的。

### Q: 中文顯示亂碼怎麼辦？
**A**: 字體是從 Google Fonts CDN 加載。如果網路慢，可能需要等待。

### Q: 可以修改設計嗎？
**A**: 可以！編輯 `weekly_menu_template.html` 的 CSS 和 HTML 結構。

### Q: 如何新增更多配色？
**A**: 在 `weekly_menu_editor.html` 中新增配色按鈕，並在 `weekly_menu_template.html` 中添加 CSS 變數。

### Q: 支援多語言嗎？
**A**: 目前設計是繁體中文。可修改模板支援其他語言。

---

## 🎓 進階改進方向

### 短期（可實施）
- [ ] 添加圖片上傳（品牌 Logo）
- [ ] 預設樣板庫
- [ ] 菜單歷史記錄
- [ ] 一鍵分享到社群媒體

### 中期（需要後端）
- [ ] 用戶帳戶系統
- [ ] 菜單版本管理
- [ ] PDF / SVG 輸出
- [ ] 批量生成功能

### 長期（商業化）
- [ ] 訂閱模式
- [ ] 高級設計主題
- [ ] API 整合
- [ ] 行動 App

---

## 🔧 本地開發

### 安裝依賴
```bash
npm install
```

### 啟動本地伺服器
```bash
npm start
```

### 訪問編輯器
```
http://localhost:3001
```

### 測試菜單生成
```bash
curl -X POST http://localhost:3001/generate \
  -H "Content-Type: application/json" \
  -d '{
    "categories": [{"name": "飲品", "items": [{"name": "奶茶", "price": "NT$100"}]}],
    "config": {"brand": "My Cafe", "title": "菜單"}
  }'
```

---

## 📊 效能指標

| 項目 | 數值 |
|------|------|
| 首次加載 | < 2 秒 |
| 菜單生成 | 5-10 秒 |
| PNG 檔案大小 | 10-50 KB |
| 月度免費額度（Railway） | $5 |
| 支援並發用戶 | 5-10 |

---

## 💡 最佳實踐

1. **菜單設計**
   - 類別不超過 4 個
   - 每類不超過 8 項
   - 保持簡潔易讀

2. **內容編寫**
   - 商品名稱簡潔（10 字以內）
   - 描述突出特色（20-30 字）
   - 價格清楚標註

3. **分享策略**
   - 每週固定發佈
   - 搭配高質感食物照片
   - 在 IG、FB、LINE 推廣

4. **維護管理**
   - 定期檢查連結有效性
   - 備份重要菜單內容
   - 追蹤用戶反饋

---

## 📞 技術支援

### 遇到問題
1. 檢查 Railway 部署日誌
2. 確認 Google Fonts 能訪問
3. 測試本地開發環境
4. 檢查 GitHub 倉庫最新版本

### 報告 Bug
- 提交 Issue 到 GitHub
- 附上截圖和重現步驟
- 記錄菜單內容和配色

---

## 📚 相關資源

- [Railway 文檔](https://docs.railway.app)
- [Puppeteer 指南](https://pptr.dev)
- [Google Fonts](https://fonts.google.com)
- [GitHub Pages](https://pages.github.com)

---

## 版本歷史

### v1.0（2026-04-23）
- ✅ 完成所有核心功能
- ✅ Railway 部署上線
- ✅ 中文字體修復
- ✅ 全部功能驗證

---

**祝你使用愉快！** 🎉
