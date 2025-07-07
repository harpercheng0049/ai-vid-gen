# 🌟 Side Project: AI Short Video Generator

這是一個「AI 短影片生成平台」，使用者只需選擇主題、風格與長度，即可自動生成包含配音、字幕與圖片的影片。此平台運用多個 AI API 技術，結合 Remotion 進行影片合成，並支援線上播放。

本專案整合前端介面與後端資料操作，並結合 UI/UX 設計，打造出使用者體驗良好、流程清晰的應用。

👉 [線上體驗請點此（Vercel 部署連結）](https://ai-vid-gen.vercel.app/)

👉 [點我查看操作影片](https://www.youtube.com/watch?v=LBcHnhYUzho)

---

## 💡 專案技術與工具

- 前端框架：Next.js（App Router）、React
- UI 元件：Tailwind CSS、shadcn/ui、Lucide Icons
- 使用者驗證：Clerk
- 資料庫：Neon PostgreSQL
- ORM 工具：Drizzle ORM
- 影音技術：Remotion（影片生成與播放）
- AI 整合：
  - Gemini AI：生成腳本與圖片描述
  - AssemblyAI：語音合成與字幕生成
  - Replicate：AI 圖片生成
- 部署平台：Vercel

---

## 🚀 開始使用

首先，啟動開發伺服器：

```bash
npm run dev
```

打開瀏覽器前往 [http://localhost:3000](http://localhost:3000) 查看結果。

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
