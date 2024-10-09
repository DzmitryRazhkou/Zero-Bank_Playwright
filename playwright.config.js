import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  retries: process.env.CI ? 2 : 0, // Retries in CI to handle flaky tests
  workers: process.env.CI ? 1 : "100%", // Single worker in CI for stability, full capacity locally
  fullyParallel: true, // Run tests in parallel by default
  // forbidOnly: !!process.env.CI, // Prevent accidental commits with .only in CI
  reporter: "html", // Generate an HTML report

  use: {
    browserName: "firefox", // Set the browser for all tests
    headless: true, // Run in headless mode for consistency in CI
    screenshot: "only-on-failure", // Capture screenshots on failures for debugging
    video: "retain-on-failure", // Retain video on failure for easier debugging
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    trace: "on-first-retry", // Enable tracing on the first retry for improved diagnostics
    viewport: { width: 1920, height: 1080 }, // Set a common viewport size
    baseURL: "http://zero.webappsecurity.com/index.html", // Set base URL
  },
});
