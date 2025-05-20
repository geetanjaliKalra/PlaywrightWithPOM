import { Browser, chromium, expect, Page, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AccountsPage } from "../pages/AccountsPage";
import { SearchPage } from "../pages/SearchPage";

import { appConfig } from "../Constants/appConstants";
import { log } from "console";

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let accountsPage: AccountsPage;
let searchPage: SearchPage;

test.beforeEach(async () => {
  browser = await chromium.launch({
    channel: "chrome",
    headless: false,
  });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  accountsPage = new AccountsPage(page);
  searchPage = new SearchPage(page);
  await loginPage.navigateToURL(appConfig.url);
  await loginPage.doLogin(appConfig.username, appConfig.password);
  // await accountsPage.searchItem(appConfig.searchItem);
});

const searchProductData = [
  { searchItem: "macbook", productCount: 3 },
  { searchItem: "samsung", productCount: 2 },
  { searchItem: "imac", productCount: 1 },
];

test.describe("Products search test", () => {
  for (const data of searchProductData) {
    test(`Search for ${data.searchItem}`, async () => {
      await accountsPage.searchItem(data.searchItem);
      const actualSearchProductCount = await searchPage.getSearchProductCount();
      console.log(`Actual product count is ${actualSearchProductCount}`);
      await page.screenshot({ path: "screenshot.png", fullPage: true });
      expect(actualSearchProductCount).toEqual(data.productCount);
    });
  }
});

const productsData = [
  {
    searchItem: "MacBook",
    productName: "MacBook Air",
    imageCount: 4,
    qty: "2",
  },

  { searchItem: "MacBook", productName: "MacBook", imageCount: 5, qty: "3" },
];

test.describe("Product images count test", () => {
  for (const data of productsData) {
    test(`Specific Product Images count test ${data.productName}`, async () => {
      await accountsPage.searchItem(data.searchItem);

      const actualImagesCount = await searchPage.getProductImagesCount(
        data.productName
      );
      await page.waitForTimeout(20000);
      console.log(`actual image count is ${actualImagesCount}`);
      expect(actualImagesCount).toEqual(data.imageCount);
    });
  }
});

test.describe("Add to cart test", () => {
  for (const data of productsData) {
    test.skip(`Add product to cart  ${data.productName}`, async () => {
      await accountsPage.searchItem(data.searchItem);
      const actualSuccessMsg = await searchPage.addToCart(
        data.productName,
        data.qty
      );

      const expectedSuccessMsg = `Success: You have added ${data.productName} to your shopping cart!`;
      console.log(`actual ${actualSuccessMsg} expected ${expectedSuccessMsg}`);

      expect(actualSuccessMsg).toBe(expectedSuccessMsg);
    });
  }
});
