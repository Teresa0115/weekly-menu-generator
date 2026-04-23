# 每週菜單產生器 · Weekly Menu Generator

**最後更新：2026-04-23**

---

## 項目概述

一個用於自動生成每週菜單 PNG 圖片的工具。分為兩個獨立版本：
- **Nosif 內部版**（3000 端口）：固定紅藍白設計
- **通用版本**（3001 端口）：支持 5 種配色主題

---

## 系統架構

```
├── 3000 Port（Nosif 專用）
│   ├── menu_server.js
│   ├── menu_editor.html（編輯器）
│   ├── menu_template.html（模版）
│   ├── menu_template_gen.html（生成中間檔）
│   └── menu_this_week.png（輸出）
│
└── 3001 Port（通用版本）
    ├── weekly_menu_server.js
    ├── weekly_menu_editor.html（編輯器）
    ├── weekly_menu_template.html（模版）
    ├── _weekly_menu_gen.html（生成中間檔）
    └── weekly_menu_output.png（輸出）
```

---

## 版本對比

| 功能 | Nosif 3000 | 通用 3001 |
|------|-----------|---------|
| 大類別支持 | ✅ | ✅ |
| 品項管理 | ✅ | ✅ |
| 品牌名稱 | ✅ | ✅ |
| 菜單標題 | ✅ | ✅ |
| 副標 | ✅ | ✅ |
| 頁尾資訊 | ✅ | ✅ |
| 日期 | ✅ | ✅ |
| 配色主題 | 紅藍白固定 | 5色可選 |
| 動態高度 | ✅ | ✅ |

---

## 完整功能清單

### 編輯器功能（前端）

**品牌設定區塊：**
- 品牌名稱輸入
- 菜單標題輸入
- 副標輸入
- 日期選擇
- 頁尾聯絡資訊

**菜單結構：**
- ➕ 新增大類別（如：鹹派、可頌、麵包）
- ➕ 在每個類別下新增品項
- 🗑️ 刪除類別或品項
- 自動驗證（至少一個品項才能產生）

**通用版專有：**
- 5 種配色主題選擇
  - 法國藍（French Blue）
  - 暖奶茶（Warm Tea）
  - 森林綠（Forest Green）
  - 深墨黑（Dark Black）
  - 玫瑰粉（Rose Pink）

### 後端功能

**Node.js Server：**
- 首頁顯示編輯器
- POST `/generate` — 產生菜單圖片
- GET `/download` — 下載 PNG 圖片
- CORS 支持跨域

**圖片生成：**
- 使用 Puppeteer 將 HTML 轉為 PNG
- 自動計算高度（內容多時自動拉長）
- 保留所有配置信息

---

## 使用方式

### 啟動 Nosif 版本（3000）
```bash
cd C:\users\user\claude-practice
node menu_server.js
```
打開瀏覽器：`http://localhost:3000`

### 啟動通用版本（3001）
```bash
cd C:\users\user\claude-practice
node weekly_menu_server.js
```
打開瀏覽器：`http://localhost:3001`

### 同時運行兩個版本
開兩個終端，分別執行上面的命令。

---

## 編輯器操作流程

1. **填寫品牌設定**
   - 品牌名稱、標題、副標、日期、聯絡方式

2. **選擇配色**（通用版）
   - 點選 5 種主題之一

3. **建立菜單結構**
   - 點「新增類別」建立第一個分類
   - 在每個類別下「新增品項」
   - 填入品項名稱和價格

4. **產生圖片**
   - 點「產生圖片」按鈕
   - 等待產生完成（會顯示 ✅ 成功）

5. **下載圖片**
   - 點「下載圖片」按鈕
   - PNG 檔案自動下載

---

## 預設資料

### Nosif 版本（3000）預設類別
```
鹹派
  ├ 鹹派雞肉  NT$ 125
  └ 鹹派培根  NT$ 125

可頌
  ├ 原味可頌  NT$ 70
  ├ 巧克力可頌 NT$ 80
  └ 芋泥可頌  NT$ 75

麵包
  └ 法棍  NT$ 95
```

### 通用版本（3001）
預設空白，用戶可完全自訂

---

## 菜單設計特色

### Nosif 版本（3000）
- **設計語言**：紅藍白法國風
- **字體**：Playfair Display（標題） + Noto Sans TC（內文）
- **版面**：清爽、專業、印刷級質感

### 通用版本（3001）
- **設計語言**：5 種可選配色（各有獨特視覺風格）
- **字體**：同上
- **適應性**：可用於各類烘焙店、咖啡館、餐廳

---

## 技術棧

- **前端**：HTML + CSS + Vanilla JavaScript
- **後端**：Node.js + Express 風格（http 模組）
- **截圖**：Puppeteer（HTML → PNG）
- **字體**：Google Fonts（Playfair Display, Noto Sans TC）

---

## 文件說明

### 核心檔案

| 檔案 | 版本 | 說明 |
|------|------|------|
| menu_server.js | Nosif | 後端伺服器（3000） |
| menu_editor.html | Nosif | 編輯器界面 |
| menu_template.html | Nosif | 菜單模版 |
| weekly_menu_server.js | 通用 | 後端伺服器（3001） |
| weekly_menu_editor.html | 通用 | 編輯器界面 |
| weekly_menu_template.html | 通用 | 菜單模版 |

### 生成檔案（自動）

| 檔案 | 版本 | 說明 |
|------|------|------|
| menu_template_gen.html | Nosif | 產生時的臨時HTML |
| menu_this_week.png | Nosif | 最終輸出圖片 |
| _weekly_menu_gen.html | 通用 | 產生時的臨時HTML |
| weekly_menu_output.png | 通用 | 最終輸出圖片 |

---

## 開發進度

### ✅ 已完成（最終版 v1.0）

- [x] 基礎菜單生成功能（Nosif 版）
- [x] 通用版本架構
- [x] 大類別支持（兩個版本）
- [x] 編輯器 UI 優化
- [x] 多主題配色系統（通用版）
- [x] 自訂品牌信息（名稱、標題、副標、頁尾）
- [x] 品項管理（名稱、價格）
- [x] **可選商品描述**（新增 2026-04-23）
- [x] 動態高度計算
- [x] PNG 下載功能
- [x] 項目文檔完成

### 🔄 未來可考慮的改進

- [ ] 商品圖片支持（需 UI 重新設計）
- [ ] 標籤系統（限定、熱銷、推薦等）
- [ ] 用戶帳戶系統
- [ ] 雲端部署（Vercel、AWS Lambda 等）
- [ ] 一鍵分享功能
- [ ] PDF / SVG 輸出選項
- [ ] 批量生成（多週菜單）
- [ ] 模版庫（預設風格）
- [ ] 行動版界面優化

---

## 部署提示

### 本地開發
目前適合本地開發和測試。

### 上架準備（未來）
若要作為線上服務上架，需考慮：
1. 部署到雲端（AWS Lambda, Vercel 等）
2. 用戶帳戶系統
3. 存儲管理（圖片暫存清理）
4. 使用量限制
5. 付費模式

---

## 聯繫資訊

**項目建立日期**：2026-04-23  
**最後更新**：2026-04-23  
**主要功能作者**：Claude Code  
**品牌方**：Nosif Pastry

---

## 更新日誌

### 2026-04-23（v1.0 發佈 + Railway 部署完成）

**上午 - 功能完成**
- ✅ 完成 Nosif 版本（3000）大類別功能
- ✅ 完成通用版本（3001）大類別功能
- ✅ 添加全自訂品牌信息欄位
- ✅ 實現 5 色主題系統（通用版）
- ✅ 編輯器 UI 全面優化
- ✅ 新增可選商品描述欄位（兩個版本）
- ✅ 完成項目文檔

**下午 - Railway 部署 + 修復**
- ✅ 部署到 Railway（自動化 GitHub 連接）
- ✅ 修復 Puppeteer 沙箱錯誤（--no-sandbox, --disable-setuid-sandbox）
- ✅ 實現 Base64 PNG 編碼下載（雲端無狀態檔案系統適配）
- ✅ 完整功能驗證（編輯器、生成、下載、5 色主題）
- ✅ 清理 GitHub 倉庫（移除舊檔案、不相關資源）
- ✅ 添加 .gitignore 配置

**線上訪問**
```
https://weekly-menu-generator-production.up.railway.app
```

### 版本資訊
- **當前版本**：v1.0（穩定版，已上線）
- **部署環境**：Railway（自動化 CD）
- **功能狀態**：完整、生產環境可用
- **已驗證功能**：✅ 所有核心功能正常運作
