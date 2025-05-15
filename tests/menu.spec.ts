import test, { Browser, chromium, expect, Page } from "@playwright/test";

let browser: Browser;
let page: Page;

test("multilevel menu test", async () => {
  browser = await chromium.launch({
    channel: "chrome",
    headless: false,
  });

  try {
    page = await browser.newPage();

    await page.goto("https://www.spicejet.com/", { waitUntil: "load" });
    await page.locator("//div[text()='Add-ons']").hover();

    await page.getByText("Taxi").first().click();

    await expect(page).toHaveTitle("Book Airport Cab");
  } finally {
    await browser.close();
  }
});
