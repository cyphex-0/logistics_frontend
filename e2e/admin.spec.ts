import { test, expect } from '@playwright/test';

test.describe('Admin Journey', () => {
  const adminEmail = process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || 'password123';

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[name="email"]', adminEmail);
    await page.fill('input[name="password"]', adminPassword);
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
  });

  test('can navigate through admin sections and view data', async ({ page }) => {
    // Dashboard
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();

    // Zones
    await page.goto('/admin/zones');
    await expect(page.getByRole('heading', { name: /Zone Management/i })).toBeVisible();

    // Pricing
    await page.goto('/admin/pricing');
    await expect(page.getByRole('heading', { name: /Pricing Rules/i })).toBeVisible();

    // Shipment Queue
    await page.goto('/admin/shipments');
    await expect(page.locator('table').first()).toBeVisible();

    // Assign courier
    // We would click on a shipment to view its details
    const shipmentLink = page.locator('a[href^="/admin/shipments/"]').first();
    if (await shipmentLink.isVisible()) {
      await shipmentLink.click();
      await page.waitForURL(/\/admin\/shipments\/.+/);

      // Verify assign courier option is available
      // The exact UI depends on implementation, might be a Select or Dialog
      await expect(page.getByText(/Assign Courier/i)).toBeVisible();
    }

    // Users
    await page.goto('/admin/users');
    await expect(page.getByText('Users')).toBeVisible();

    // Audit logs (if implemented)
    // await page.goto('/admin/audit');
    // await expect(page.getByText('Audit Logs')).toBeVisible();
  });
});
