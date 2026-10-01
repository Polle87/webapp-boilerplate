/// <reference types="node" />

import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './api',
    outputDir: './results/api',
    fullyParallel: true,
    reporter: [['list'], ['html', { outputFolder: './reports/api', open: 'never' }]],
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: 'http://127.0.0.1:3001',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'yarn workspace @boilerplate/backend dev',
        url: 'http://127.0.0.1:3001/health',
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
    },
});
