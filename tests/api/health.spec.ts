import { expect, test } from '@playwright/test';

test('GET /health returns a healthy status', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.ok()).toBe(true);
    await expect(response).toBeOK();
    await expect(response.json()).resolves.toEqual({ status: 'ok' });
});
