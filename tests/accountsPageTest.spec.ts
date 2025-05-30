import test, { Browser, chromium, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { appConfig } from "../Constants/appConstants";
import { AccountsPage } from "../pages/AccountsPage";

let browser: Browser;
let accountsPage: AccountsPage;
let loginPage: LoginPage;

test.beforeEach("Accounts Page test", async ({ page }) => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  accountsPage = new AccountsPage(page);
  await loginPage.navigateToURL(appConfig.url);
  await loginPage.doLogin(appConfig.username, appConfig.password);
});

test("Search field visible test", async () => {
  expect(accountsPage.isSearchFieldVisible()).toBeTruthy();
});

test("Logout Link visible test", async () => {
  expect(accountsPage.isLogoutLinkVisible).toBeTruthy();
});

test("Menu Items count test", async () => {
  const actualMenuItems = await accountsPage.getMenuItems();
  console.log(actualMenuItems);
  expect(actualMenuItems).toEqual(appConfig.expectedMenuItems);
});

test("Accounts Page Grid test", async () => {
  const actualItems = await accountsPage.getLeftGridItems();
  expect(actualItems).toEqual(appConfig.accountsPageLefftGridItems);
});

test("Search test", async () => {
  await accountsPage.searchItem(appConfig.searchItem);
  const expectedTitle = "Search - " + appConfig.searchItem;
  console.log(expectedTitle);
  await expect(accountsPage.page).toHaveTitle(expectedTitle);
});
