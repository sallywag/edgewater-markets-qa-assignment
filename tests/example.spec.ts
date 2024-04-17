import { test, expect } from '@playwright/test';

test('Searching for exact book yields correct first result', async ({ page }) => {
  await page.goto('/');
  await page.locator('#GlobalSearch input').fill('The Lord of the Rings: The Fellowship of the Ring by J.R.R. Tolkien');
  await page.locator('.Search-submit').click();
  const firstResult = page.locator('.SearchContentResults-tilesContainer div.AllEditionsItem-tile').first();
  await expect(firstResult.locator('.AllEditionsItem-tileTitle')).toHaveText('The Lord of the Rings: The Fellowship of the Ring');
  await expect(firstResult.locator('[itemprop=author]')).toHaveText('J.R.R. sTolkien');
});

test('Added book shows in cart', async ({ page }) => {
  await page.goto('/');
  await page.locator('.BookSlideDesktop-Container').first().click();
  const bookTitle = await page.locator('.WorkMeta-title').textContent();
  await page.getByText('Add to cart').click();
  await page.getByText('View Cart & Checkout').click();
  await expect(page.locator('.ShoppingCartItem-title')).toHaveText(bookTitle);
});

