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

test('Expected number of items show on search page', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Search 19 million titles by title, author, or ISBN').fill('Health');
  await page.locator('.Search-submit').click();
  await expect(page.locator('.AllEditionsItem-tile.Recipe-default')).toHaveCount(50);
  await page.locator('#Search-sortBar-perpage-description').selectOption('5');
  await expect(page.locator('.AllEditionsItem-tile.Recipe-default')).toHaveCount(5);
  await page.locator('#Search-sortBar-perpage-description').selectOption('10');
  await expect(page.locator('.AllEditionsItem-tile.Recipe-default')).toHaveCount(10);
  await page.locator('#Search-sortBar-perpage-description').selectOption('30');
  await expect(page.locator('.AllEditionsItem-tile.Recipe-default')).toHaveCount(30);
  await page.locator('#Search-sortBar-perpage-description').selectOption('50');
  await expect(page.locator('.AllEditionsItem-tile.Recipe-default')).toHaveCount(50);
});