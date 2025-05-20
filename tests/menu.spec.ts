import test, { Browser, chromium, expect, Page } from "@playwright/test";
import { log } from "console";

let browser: Browser;
let page: Page;

test("multilevel menu test", async () => {
  browser = await chromium.launch({
    channel: "chrome",
    headless: false,
    args: ["--start-maximized"],
  });

  try {
    page = await browser.newPage();

    await page.goto("https://www.spicejet.com/", { waitUntil: "load" });
    await page.locator("//div[text()='Add-ons']").hover();
    await page.getByText("Taxi").first().click();
    const [popup] = await Promise.all([page.context().waitForEvent("page")]);
    await popup.waitForLoadState();
    await expect(popup).toHaveTitle("Book Airport Cab");
    await page.bringToFront();
    console.log(await page.title());
  } finally {
    await browser.close();
  }

  // retries: 2;
});
