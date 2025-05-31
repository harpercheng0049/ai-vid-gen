import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_37PsLUwBgqha@ep-damp-mode-a1gs5m0t-pooler.ap-southeast-1.aws.neon.tech/ai-short-video-generator?sslmode=require"
  },
});
