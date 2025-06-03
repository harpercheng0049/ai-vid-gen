這是一個使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 建立的 [Next.js](https://nextjs.org) 專案。

## 🚀 開始使用

首先，啟動開發伺服器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

打開瀏覽器前往 [http://localhost:3000](http://localhost:3000) 查看結果。

你可以從修改 `app/page.js` 開始編輯這個頁面。儲存後頁面會自動更新。

本專案使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自動優化並載入 Vercel 推出的字體 [Geist](https://vercel.com/font)。

## 📚 延伸學習

若你想進一步了解 Next.js，可以參考以下資源：

- [Next.js 官方文件](https://nextjs.org/docs) - 介紹 Next.js 的各項功能與 API
- [Learn Next.js 線上互動教學](https://nextjs.org/learn) - 實作式學習教學

你也可以造訪 [Next.js 的 GitHub 倉庫](https://github.com/vercel/next.js)，歡迎提供反饋或參與貢獻！

## ☁️ 使用 Vercel 部署

部署 Next.js 專案最簡單的方式是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，這是 Next.js 的開發團隊所打造。

更多部署細節請參考官方文件：[Next.js 部署教學](https://nextjs.org/docs/app/building-your-application/deploying)

---

## ✅ Git 工作流程與版本管理

### ✅ 主要分支（Main Branches）

| 分支名稱 | 功能說明                                         |
| -------- | ------------------------------------------------ |
| `main`   | 正式發佈分支（穩定、可部署至 Production）        |
| `dev`    | 主開發分支（所有功能先合併至此，驗證無誤再發佈） |

---

### 🌿 功能性分支（Feature Branches）

| 分支類型   | 命名範例                                   |
| ---------- | ------------------------------------------ |
| 新功能     | `feat/authentication`, `feat/signup-form`  |
| 修 bug     | `fix/signin-redirect`, `fix/ui-bug-navbar` |
| 發佈前準備 | `release/v1.3.0`                           |
| 緊急修補   | `hotfix/crash-on-load`                     |

> ✅ 所有開發請從 `dev` 分支派生新分支，再合併回 `dev`。

---

### 🔄 Pull Request 規則

- 功能 PR：`feat/*` → `dev`
- 發佈 PR：`dev` → `main`（僅限穩定版本）
- 每次 PR 建議使用清楚的標題與描述：
  - `feat: add user signup form`
  - `fix: correct redirect on login failure`

---

### 🏷️ 版本命名規則（Semantic Versioning）

格式：`vMAJOR.MINOR.PATCH`

| 類型  | 範例     | 使用時機                 |
| ----- | -------- | ------------------------ |
| Major | `v2.0.0` | 有破壞性變更或不相容版本 |
| Minor | `v1.2.0` | 新功能、不破壞原功能     |
| Patch | `v1.2.1` | 錯誤修正、小調整         |

#### 打 tag 流程：

```bash
git tag -a v1.2.0 -m "Release: sign-in UI + database setup"
git push origin v1.2.0
```
