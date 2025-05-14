import { Locator, Page } from "@playwright/test";
import { appConfig } from "../Constants/appConstants";
import {
  doClick,
  fillInput,
  fillInput,
  getAllElements,
} from "../utilities/elementutil";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: string = '[id="input-email"]';
  readonly passwordField: string = '[id="input-password"]';
  readonly loginBtn: string = "//input[@type='submit']";
  readonly rightGrid: string = ".list-group >a";

  constructor(page: Page) {
    this.page = page;
    //this.usernameField = page.locator('[id="input-email"]');
    // this.passwordField = page.locator('[id="input-password"]');
    // this.loginBtn = page.locator("//input[@type='submit']");
  }

  async navigateToURL(url = appConfig.url) {
    console.log(url);

    await this.page.goto(url);
  }

  async doLogin(username: string, password: string) {
    await fillInput(this.page, this.usernameField, username);
    await fillInput(this.page, this.passwordField, password);
    await doClick(this.page, this.loginBtn);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getGridContent() {
    const gridElements = await getAllElements(this.page, this.rightGrid);
    await console.log(`total elements found are ${gridElements.length}`);
    return gridElements;
  }
}
