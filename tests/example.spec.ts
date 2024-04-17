import { test, expect } from '@playwright/test';

test('Searching for exact book yields correct first result', async ({ page }) => {
  await page.goto('/');
  await page.locator('#GlobalSearch input').fill('The Lord of the Rings: The Fellowship of the Ring by J.R.R. Tolkien');
  await page.locator('.Search-submit').click();
  const firstResult = page.locator('.SearchContentResults-tilesContainer div.AllEditionsItem-tile').first();
  await expect(firstResult.locator('.AllEditionsItem-tileTitle')).toHaveText('The Lord of the Rings: The Fellowship of the Ring');
  await expect(firstResult.locator('[itemprop=author]')).toHaveText('J.R.R. sTolkien');
})