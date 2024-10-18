import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Directory where your tests are located
  testMatch: "**/*.spec.js", // Match test files ending in .spec.js
  retries: process.env.CI ? 2 : 0, // Retries only in CI for flaky tests
  workers: process.env.CI ? 1 : 4, // Single worker in CI for stability, parallel locally
  fullyParallel: true, // Run tests in parallel by default
  reporter: "html", // Generate an HTML report

  use: {
    browserName: "chromium", // Set default browser to Chromium
    headless: process.env.CI ? true : false, // Headless in CI for faster execution
    screenshot: "only-on-failure", // Capture screenshots on test failures
    video: "retain-on-failure", // Retain video recordings only on failures
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    trace: "on-first-retry", // Enable tracing on the first retry for detailed diagnostics
    viewport: { width: 1920, height: 1080 }, // Standard viewport for consistent results
    baseURL: "http://zero.webappsecurity.com/index.html", // Base URL for your tests
  },
});
