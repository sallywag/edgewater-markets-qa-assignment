import { expect, type Locator, type Page } from '@playwright/test';

export class ThriftBooksBrowsePage {
  readonly page: Page;
  readonly sortBySelect: Locator;
  readonly itemsPerPageSelect: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortBySelect = page.locator('#Search-sortBar-sortby-description');
    this.itemsPerPageSelect = page.locator('#Search-sortBar-perpage-description');
    this.addToCartButton = page.locator('button', { hasText: 'Add to Cart' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async sortBy(value: SortByValue) {
    await this.sortBySelect.selectOption(value);
  }

  async setItemsPerPage(value: ItemsPerPageValue) {
    await this.itemsPerPageSelect.selectOption(value);
  }

  async addItemToCart(position: number) {
    await this.addToCartButton.nth(position).click();
  }
}

type SortByValue = 'Most Popular' | 'Relevance' | 'Bestsellers' |'Title (A to Z)' | 'Title (Z to A)' | 'Publication Date (newest)' | 'Publication Date (oldest)';

type ItemsPerPageValue = '5' | '10' | '30' | '50';