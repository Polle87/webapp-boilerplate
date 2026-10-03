/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

const isCI = process.env.CI !== undefined && process.env.CI !== '';

export default defineConfig({
    testDir: '.',
    fullyParallel: true,
    reporter: [['list'], ['html', { outputFolder: './reports', open: 'never' }]],
    retries: isCI ? 2 : 0,
    projects: [
        {
            name: 'api',
            testDir: './api',
            outputDir: './results',
            use: {
                baseURL: 'http://127.0.0.1:3001',
                trace: 'on-first-retry',
            },
        },
        {
            name: 'chromium',
            testDir: './e2e',
            outputDir: './results',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'http://127.0.0.1:3000',
                trace: 'on-first-retry',
            },
        },
    ],
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
});
