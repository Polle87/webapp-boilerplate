import { expect, test } from '@playwright/test'

test('Home page shows Boilerplate', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Boilerplate' })).toBeVisible()
})

test('API proxy returns healthy status', async ({ request }) => {
    const healthResponse = await request.get('/api/health')
    await expect(healthResponse).toBeOK()
    await expect(healthResponse.json()).resolves.toEqual({ status: 'ok' })
})
