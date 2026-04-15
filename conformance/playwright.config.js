import { defineConfig } from '@playwright/test';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  workers: 4,
  reporter: [
    ['list'],
    ['json', { outputFile: './reports/playwright-results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:8844',
    headless: true,
    // Chromium required for LanguageDetector API (used by ed11y language checks)
    browserName: 'chromium',
  },
  webServer: {
    command: 'node conformance/scripts/serve-testcases.js',
    port: 8844,
    reuseExistingServer: true,
    cwd: projectRoot,
  },
});
