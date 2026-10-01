import { test, expect } from '@playwright/test';

test.describe('Authorization Barriers', () => {
  const customerEmail = process.env.NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL || 'customer@example.com';
  const customerPassword = process.env.NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD || 'password123';
  const courierEmail = process.env.NEXT_PUBLIC_DEMO_COURIER_EMAIL || 'courier@example.com';
  const courierPassword = process.env.NEXT_PUBLIC_DEMO_COURIER_PASSWORD || 'password123';

  test.describe('Customer', () => {
    test.beforeEach(async ({ page }) => {
      // Login as customer
      await page.goto('/login');
      await page.fill('input[name="email"]', customerEmail);
      await page.fill('input[name="password"]', customerPassword);
      await page.click('button[type="submit"]');
      await page.waitForURL('/dashboard');
    });

    test('cannot access admin routes', async ({ page }) => {
      await page.goto('/admin');
      // Should redirect to dashboard
      await page.waitForURL('/dashboard');
      expect(page.url()).toContain('/dashboard');
    });
  });

  test.describe('Courier', () => {
    test.beforeEach(async ({ page }) => {
      // Login as courier
      await page.goto('/login');
      await page.fill('input[name="email"]', courierEmail);
      await page.fill('input[name="password"]', courierPassword);
      await page.click('button[type="submit"]');
      await page.waitForURL('/courier');
    });

    test('cannot access admin routes', async ({ page }) => {
      await page.goto('/admin');
      // Should redirect to courier dashboard
      await page.waitForURL('/courier');
      expect(page.url()).toContain('/courier');
    });

    test('cannot access customer routes', async ({ page }) => {
      await page.goto('/dashboard');
      // Should redirect to courier dashboard
      await page.waitForURL('/courier');
      expect(page.url()).toContain('/courier');
    });
  });
});
