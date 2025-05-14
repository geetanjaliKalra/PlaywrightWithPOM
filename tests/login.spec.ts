import test, { Page, Browser, chromium, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { appConfig } from "../Constants/appConstants";

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

test.beforeEach(async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.navigateToURL(appConfig.url);
});

test("login test", async () => {
  await loginPage.doLogin(appConfig.username, appConfig.password);
  await expect(page).toHaveTitle("My Account");
  // const title = await loginPage.getPageTitle();
  // console.log(title);
  // expect(await loginPage.getPageTitle()).toContain("My Account");
});

test("Login page Title test", async () => {
  const pagetitle = await loginPage.getPageTitle();
  // console.log(pagetitle);
  await expect(page).toHaveTitle("Account Login");
});

test("Data on grid test", async () => {
  expect(await loginPage.getGridContent()).toHaveLength(13);
});
