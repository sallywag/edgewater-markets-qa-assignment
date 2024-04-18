import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Searching for exact book yields correct first result', {
  annotation: {
    type: 'Summary',
    description: 'Search for a book, verify it\'s title and author shows in the first results card.'
  }
}, async ({ page }) => {
  await page.getByPlaceholder('Search 19 million titles by title, author, or ISBN').fill('The Lord of the Rings: The Fellowship of the Ring by J.R.R. Tolkien');
  await page.locator('.Search-submit').click();

  const firstResult = page.locator('.SearchContentResults-tilesContainer div.AllEditionsItem-tile').first();

  await expect(firstResult.locator('.AllEditionsItem-tileTitle')).toHaveText('The Lord of the Rings: The Fellowship of the Ring');
  await expect(firstResult.locator('[itemprop=author]')).toHaveText('J.R.R. Tolkien');
});

test('Added book shows in cart', {
  annotation: {
    type: 'Summary',
    description: 'Click first book on the home page, add it to cart, view cart, verify it shows in the cart.'
  }
}, async ({ page }) => {
  await page.locator('.BookSlideDesktop-Container').first().click();

  const bookTitle = await page.locator('.WorkMeta-title').textContent();
  const author = await page.locator('.WorkMeta-authors a').first().textContent();
  const format = await page.locator('.NewButton.WorkSelector-button.is-selected .WorkSelector-bold').first().textContent();
  const condition = await page.locator('.NewButton.WorkSelector-button.is-selected .WorkSelector-bold').nth(1).textContent();
  const price = await page.locator('.NewButton.WorkSelector-button.is-selected .WorkSelector-bold.WorkSelector-red').textContent();

  await page.getByText('Add to cart').click();
  await page.getByText('View Cart & Checkout').click();
  
  // Check for null so TypeScript does not complain (temporary solution)
  if(bookTitle !== null && author !== null && format !== null && condition !== null && price !== null) {
    await expect(page.locator('.ShoppingCartItem')).toHaveCount(1);
    await expect(page.locator('.ShoppingCartItem')).toContainText(bookTitle);
    await expect(page.locator('.ShoppingCartItem')).toContainText(author);
    await expect(page.locator('.ShoppingCartItem')).toContainText(format);
    await expect(page.locator('.ShoppingCartItem')).toContainText(condition);
    await expect(page.locator('.ShoppingCartItem')).toContainText(price);
  }
});

test('Expected number of items show on search page', {
  annotation: {
    type: 'Summary',
    description: 'Search a category, change items per page, verify only selected number of items per page show.'
  }
}, async ({ page }) => {
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

test('Remove item from cart', {
  annotation: {
    type: 'Summary',
    description: 'Click first book on the home page, add it to cart, view cart, remove it from cart, verify it is no longer in cart.'
  }
}, async ({ page }) => {
  await page.locator('.BookSlideDesktop-Container').first().click();
  await page.getByText('Add to cart').click();
  await page.getByText('View Cart & Checkout').click();
  await page.getByText('Remove').click();

  await expect(page.locator('.ShoppingCart-titleArea')).toContainText('0 items');
  await expect(page.locator('.ShoppingCart-Messages')).toContainText('Your shopping cart is currently empty.');
  await expect(page.locator('.ShoppingCartItem')).toHaveCount(0);
});

test('Create wishlist', {
  annotation: {
    type: 'Summary',
    description: 'Log in, go to wishlist page, create a wishlist, verify wishlist is created.'
  }
}, async ({ page }) => {
  await page.getByText('Log In').click();

  await page.locator('#ExistingAccount_EmailAddress').fill('testemail-834hfrn@test.com');
  await page.locator('#ExistingAccount_Password').fill('Test123!');
  await page.locator('[value="Log In"]').click();

  await page.locator('.Header-button.Header-wishlist').click();
  await page.getByText('+ Create New List').click();
  const wishlistName = (Math.random() + 1).toString(36).substring(7);
  await page.locator('#listName').fill(wishlistName);
  await page.getByText('Create List').click();

  await expect(page.locator('.WishList-HeaderName')).toHaveText(wishlistName);
  await expect(page.locator('.WishList-RootColA')).toContainText(wishlistName);
});
