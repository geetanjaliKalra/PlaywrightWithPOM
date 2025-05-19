import { Page } from "@playwright/test";
import {
  doClick,
  fillInput,
  fillInputUsingPlaceholder,
  getAllElements,
} from "../utilities/elementutil";
import { title } from "process";
import { log } from "console";

export class AccountsPage {
  page: Page;
  readonly searchField: string = "Search";
  readonly logoutLink: string = "Logout";
  readonly menuItems: string = "//ul[@class='nav navbar-nav']/li/a";
  readonly leftGrid: string =
    "//div[@id='content']//li|//div[@id='content']/h2";
  readonly searchBtn: string = "#search button";

  constructor(page) {
    this.page = page;
  }

  async isSearchFieldVisible() {
    return await this.page.getByPlaceholder(this.searchField).isVisible();
  }

  async isLogoutLinkVisible() {
    return await this.page
      .getByRole("link", { name: this.logoutLink })
      .isVisible();
  }

  async getMenuItems() {
    const actualMenuItems: string[] = await getAllElements(
      this.page,
      this.menuItems
    );
    return actualMenuItems;
  }

  async getLeftGridItems() {
    const actualItems = await getAllElements(this.page, this.leftGrid);
    return actualItems;
  }

  async searchItem(searchItem) {
    await fillInputUsingPlaceholder(this.page, this.searchField, searchItem);
    await doClick(this.page, this.searchBtn);
    console.log(`Search page title is ${await this.page.title()}`);
    //return await this.page.title();
  }
}
