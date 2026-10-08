import { test, expect } from '@playwright/test';

test('Smoke test: load example and search', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('CodeGraph Viewer')).toBeVisible();

  await page.getByText('Load Soroban Example Graph').click();

  await expect(page.getByPlaceholder(/Search/)).toBeVisible();
  
  // Verify react flow container is there
  await expect(page.locator('.react-flow')).toBeVisible();

  // Search
  const searchInput = page.getByPlaceholder(/Search/);
  await searchInput.fill('increment');
  
  // Assert search happened (React flow handles the class updates so we just verify the input is filled)
  await expect(searchInput).toHaveValue('increment');
});
