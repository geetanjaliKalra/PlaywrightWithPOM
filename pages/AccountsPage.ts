import { Page } from "@playwright/test";
import { getAllElements } from "../utilities/elementutil";

export class AccountsPage {
  readonly page: Page;
  readonly searchField: string = "Search";
  readonly logoutLink: string = "Logout";
  readonly menuItems: string = "//ul[@class='nav navbar-nav']/li/a";

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
    return await actualMenuItems;
  }
}
