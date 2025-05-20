import test, { Browser, chromium, Page } from "@playwright/test";
import { count, log } from "console";

let browser: Browser;
let page: Page;

test("select locator usage test", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://www.orangehrm.com/en/contact-sales");
  await printAndSelectOption(page, "#Form_getForm_Country", "Hong Kong");
});

async function printAndSelectOption(
  page: Page,
  selectSelector: string,
  valueToSelect: string
) {
  const options = await page
    .locator(`${selectSelector} option`)
    .allTextContents();
  for (const option of options) {
    const trimmedOption = option.trim();
    console.log(trimmedOption);
    if (trimmedOption.toLowerCase() === valueToSelect.toLowerCase()) {
      await page.locator(selectSelector).selectOption({ label: trimmedOption });
      await page.waitForTimeout(5000);
      console.log(`${trimmedOption} is selected`);
      break;
    }
  }
}
