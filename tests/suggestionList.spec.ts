import test, { Browser, chromium, expect, Page } from "@playwright/test";

let browser: Browser;
let page: Page;
test("suggestionlist test", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://www.amazon.ae/");

  await page.getByRole("searchbox").fill("mobile");

  await page.waitForSelector(
    "//div[contains(@class,'s-suggestion') and @role='button']"
  );
  let suggList = await page.$$(
    "//div[contains(@class,'s-suggestion') and @role='button']"
  );

  for (const e of suggList) {
    const suggestion = await e.textContent();
    console.log(suggestion);

    if (suggestion == "mobile stand holder") {
      await e.click();
      console.log(`selected ${suggestion}`);

      break;
    }
  }
});
