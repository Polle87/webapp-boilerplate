/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

const isCI = process.env.CI !== undefined && process.env.CI !== '';

export default defineConfig({
    testDir: './e2e',
    outputDir: './results/e2e',
    fullyParallel: true,
    reporter: [['list'], ['html', { outputFolder: './reports/e2e', open: 'never' }]],
    retries: isCI ? 2 : 0,
    use: {
        baseURL: 'http://127.0.0.1:3000',
        trace: 'on-first-retry',
    },
    webServer: [
        {
            command: 'yarn workspace @boilerplate/backend dev',
            url: 'http://127.0.0.1:3001/health',
            reuseExistingServer: !isCI,
            timeout: 30_000,
        },
        {
            command: 'yarn workspace @boilerplate/frontend dev',
            url: 'http://127.0.0.1:3000',
            reuseExistingServer: !isCI,
            timeout: 30_000,
        },
    ],
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
