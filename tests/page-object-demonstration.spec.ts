import { test, expect } from '@playwright/test';
import { ThriftBooksHomePage } from '../pages/thriftbooks-home-page';
import { ThriftBooksBrowsePage } from '../pages/thriftbooks-browse-page';

test('Demonstrate page interaction with page objects', {
  annotation: {
    type: 'Summary',
    description: 'Search for an item, sort on browse page, add item to cart.'
  }
}, async ({ page }) => {
  const thriftBooksHomePage = new ThriftBooksHomePage(page);
  const thriftBooksBrowsePage = new ThriftBooksBrowsePage(page);

  await thriftBooksHomePage.goto();
  await thriftBooksHomePage.searchFor('cats');
  await thriftBooksBrowsePage.setItemsPerPage('30');
  await thriftBooksBrowsePage.sortBy('Bestsellers');
  await thriftBooksBrowsePage.addItemToCart(1);
});