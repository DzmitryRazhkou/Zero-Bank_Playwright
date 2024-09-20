import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  // fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    browserName: "firefox",
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    ignoreHTTPSErrors: true,
    trace: "on",
    viewport: { width: 1920, height: 1080 },
    baseURL: "http://zero.webappsecurity.com/index.html",
  },
});
