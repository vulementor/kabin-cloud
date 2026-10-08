import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.mjs",
  timeout: 60_000,
  expect: { timeout: 8_000 },
  retries: 1,
  workers: 2,
  reporter: [["list"]],
  use: {
    baseURL: process.env.QA_BASE_URL || "http://127.0.0.1:8765/",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  outputDir: "test-results"
});
