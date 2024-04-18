import { test, expect } from '@playwright/test';
import { ThriftBooksHomePage } from '../pages/thriftbooks-home-page';
import { ThriftBooksBrowsePage } from '../pages/thriftbooks-browse-page';
import { ThriftBooksLoginPage } from '../pages/thriftbooks-login-page';

test('Demonstrate page interaction with page objects', {
  annotation: {
    type: 'Summary',
    description: 'Search for an item, sort on browse page, add item to cart, login.'
  }
}, async ({ page }) => {
  const thriftBooksHomePage = new ThriftBooksHomePage(page);
  const thriftBooksBrowsePage = new ThriftBooksBrowsePage(page);
  const thriftBooksLoginPage = new ThriftBooksLoginPage(page);

  await thriftBooksHomePage.goto();
  await thriftBooksHomePage.searchFor('cats');
  await thriftBooksBrowsePage.setItemsPerPage('30');
  await thriftBooksBrowsePage.sortBy('Bestsellers');
  await thriftBooksBrowsePage.addItemToCart(1);
  await thriftBooksLoginPage.goto();
  await thriftBooksLoginPage.login('testemail-834hfrn@test.com', 'Test123!');
});