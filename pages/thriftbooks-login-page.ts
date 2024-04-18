import { expect, type Locator, type Page } from '@playwright/test';

export class ThriftBooksLoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('#ExistingAccount_EmailAddress');
    this.passwordField = page.locator('#ExistingAccount_Password');
    this.loginButton = page.locator('[value="Log In"]');
  }

  async goto() {
    await this.page.goto('account/login');
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}