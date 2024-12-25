import { defineConfig, devices } from "@playwright/test";

const ci = process.env.CI === "true";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 2 : 0,
  workers: undefined,
  reporter: ci ? "blob" : "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "http://localhost:4000",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: "**/*.setup.ts" },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: ["setup"],
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      dependencies: ["setup"],
    },
  ],
  webServer: {
    command: "npm run start:test",
    cwd: "../..",
    url: "http://localhost:4001/graphql",
    reuseExistingServer: true,
    // Default 60 sec timeout is not enough on CI to build images.
    timeout: 2 * 60 * 1000,
  },
});
