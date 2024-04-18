import { expect, type Locator, type Page } from '@playwright/test';

export class ThriftBooksHomePage {
  readonly page: Page;
  readonly searchBar: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.locator('.Search-input');
    this.searchButton = page.locator('.Search-submit button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchFor(text: string) {
    await this.searchBar.fill(text);
    await this.searchButton.click();
  }
}