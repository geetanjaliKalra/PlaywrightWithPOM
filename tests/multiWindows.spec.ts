import { test, Browser, Page, chromium } from "@playwright/test";
import { channel } from "diagnostics_channel";
import { Context } from "vm";

let browser: Browser;
let page: Page;

test("MultiWindows/Tabs test", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://www.orangehrm.com/en/book-a-free-demo");

  const [newWindow] = await Promise.all([
    context.waitForEvent("page"),
    page.getByAltText("facebook logo").click(),
  ]);
  console.log(newWindow.url());
  console.log(await newWindow.title());
  await page.waitForTimeout(2000);
  newWindow.close();
  await page.waitForTimeout(2000);
  console.log(await page.title());
  console.log(page.url());
});
