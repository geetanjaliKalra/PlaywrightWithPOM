import { Logger, Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { AccountsPage } from "./AccountsPage";
import { appConfig } from "../Constants/appConstants";
import {
  doClick,
  doClickUsingRole,
  fillInput,
  getAllElements,
  getElementCount,
} from "../utilities/elementutil";

export class SearchPage {
  page: Page;
  readonly accountspage: AccountsPage;
  readonly products: string = ".caption a";
  readonly productLinkLocator: string = "link";
  readonly productImages: string = "ul.thumbnails img";
  readonly addToCartBtn: string = "[id='button-cart']";
  readonly qtyField: string = "[id='input-quantity']";
  readonly successMsg: string =
    "xpath=//div[contains(@class,'alert-success alert-dismissible')]";

  constructor(page) {
    this.page = page;
    this.accountspage = new AccountsPage(this.page);
  }

  async getSearchProductCount() {
    // await this.accountspage.searchItem(appConfig.searchItem);
    const elementCount = await getElementCount(this.page, this.products);
    return elementCount;
  }

  async getProductImagesCount(productName: string) {
    await doClickUsingRole(this.page, this.productLinkLocator, productName);
    // await this.page
    //   .locator(this.productImages)
    //   .first()
    //   .waitFor({ state: "visible" });
    // const imgcount = await this.page.locator(this.productImages).count();
    const imgcount = await getElementCount(this.page, this.productImages);
    return imgcount;
    // await getElementCount(this.page, this.productImages);
  }

  async addToCart(productName: string, qty: string) {
    await doClickUsingRole(this.page, this.productLinkLocator, productName);
    await fillInput(this.page, this.qtyField, qty);
    await doClick(this.page, this.addToCartBtn);
    let actSuccessMsg = await this.page
      .locator(this.successMsg)
      .first()
      .textContent();
    actSuccessMsg = actSuccessMsg?.slice(0, actSuccessMsg.length - 1) || null;
    console.log(actSuccessMsg);
    return actSuccessMsg;
  }
}
