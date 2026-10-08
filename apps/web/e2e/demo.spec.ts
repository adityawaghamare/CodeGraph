import { test, expect } from '@playwright/test';

test('Demo CodeGraph Viewer', async ({ page }) => {
  await page.goto('http://localhost:4173/');

  // Initial state screenshot
  await page.screenshot({ path: '../../screenshots/01-empty.png', fullPage: true });

  await page.getByText('Load Soroban Example Graph').click();

  // Wait for react flow to render
  await expect(page.locator('.react-flow__node').first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000); // Wait for layout animation

  // Graph loaded screenshot
  await page.screenshot({ path: '../../screenshots/02-graph-loaded.png', fullPage: true });

  const searchInput = page.getByPlaceholder(/Search/);
  await searchInput.fill('increment');
  await page.waitForTimeout(2000); // highlight effect

  // Search screenshot
  await page.screenshot({ path: '../../screenshots/03-search.png', fullPage: true });
});
