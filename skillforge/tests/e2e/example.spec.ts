import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/SkillForge/);
  await expect(page.locator('h1')).toContainText('SkillForge');
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  // Add more navigation tests as your app grows
});