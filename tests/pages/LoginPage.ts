import { Page, Locator } from '@playwright/test';

export class LoginPage {

    private UserName : Locator;
    private Password : Locator;
    private SubmitButton: Locator;

  constructor(private page: Page) {

    this.UserName = page.locator('input[name="username"]');
    this.Password = page.locator('input[name="password"]');
    this.SubmitButton = page.locator('button[type="submit"]');

  }
    
  async goto(url:string) {
    await this.page.goto(url); // použije baseURL z configu
  }

  async login(username: string, password: string) {
    await this.UserName.fill(username)
    await this.Password.fill(password)
    await this.SubmitButton.click();
  }
}
