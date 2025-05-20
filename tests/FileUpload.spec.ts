import test, { Browser, chromium, expect, Page } from "@playwright/test";

let browser: Browser;
let page: Page;
test("File upload test", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/upload");

  await page
    .locator("#file-upload")
    .setInputFiles("C:/Users/Geetu/Pictures/Screenshots/img1.png");
  await page.locator("#file-submit").click();

  expect(page.getByRole("heading", { name: "File Uploaded!" })).toBeVisible();
});
