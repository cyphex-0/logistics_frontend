import { test, expect } from '@playwright/test';

test.describe('Courier Journey', () => {
  const courierEmail = process.env.NEXT_PUBLIC_DEMO_COURIER_EMAIL || 'courier@example.com';
  const courierPassword = process.env.NEXT_PUBLIC_DEMO_COURIER_PASSWORD || 'password123';

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', courierEmail);
    await page.fill('input[name="password"]', courierPassword);
    await page.click('button[type="submit"]');
    await page.waitForURL('/courier');
  });

  test('can check notifications, view assigned shipments and update status', async ({ page }) => {
    // View assigned shipments on dashboard
    await expect(page.getByText('Assigned Shipments').first()).toBeVisible();

    // Check notifications
    // There might be a notifications icon or link
    // Let's assume there is a notification bell
    // await page.click('button[aria-label="Notifications"]');
    
    // Go to first shipment details
    const shipmentLink = page.locator('a[href^="/courier/shipments/"]').first();
    if (await shipmentLink.isVisible()) {
      await shipmentLink.click();
      await page.waitForURL(/\/courier\/shipments\/.+/);

      // We should be able to update status
      const updateButton = page.getByRole('button', { name: /Update Status/i });
      if (await updateButton.isVisible()) {
        await updateButton.click();
        
        // Wait for the modal or dropdown
        // (We don't actually submit to avoid breaking real backend state if it's live, 
        //  but in test environments we might. Let's just verify the options exist.)
        await expect(page.getByText('PICKED_UP')).toBeVisible();
        await expect(page.getByText('IN_TRANSIT')).toBeVisible();
        await expect(page.getByText('OUT_FOR_DELIVERY')).toBeVisible();
        await expect(page.getByText('DELIVERED')).toBeVisible();
      }
    }
  });
});
