import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright e2e setup.
 * Run with:  npx playwright install && npx playwright test
 * Starts the production server automatically (build first: npm run build).
 */
export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    locale: "fa-IR",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
