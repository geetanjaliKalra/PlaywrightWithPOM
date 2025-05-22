import { test, expect, Browser, Page, chromium } from "@playwright/test";
import { log } from "console";
import { waitForDebugger } from "inspector";

let browser: Browser;
let page: Page;
test("calendar test", async ({}) => {
  const monthToBeSelected = "July 2026";
  const dateToBeSelected = "31";
  const dateLocator = `//div[text()='${monthToBeSelected}']/../..//div[contains(@class,'DayPicker-Day')and @aria-disabled='false' ]`;
  const monthSelector = "//div[@class='DayPicker-Caption']";
  const nextMonthLocator = "[aria-label='Next Month']";

  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://www.goibibo.com/");
  await page.locator("//span[@class='logSprite icClose']").click();
  await page.getByText("Departure").click();
  await selectDepartDate(
    monthSelector,
    monthToBeSelected,
    dateLocator,
    dateToBeSelected,
    nextMonthLocator
  );
  const finalSelectedDate = await page
    .locator("//span[text()='Departure']/../p")
    .first()
    .textContent();
  console.log(finalSelectedDate);
});

async function selectDate(dateLocator: string, dateToBeSelected: string) {
  const calDates = await page.locator(dateLocator).all();
  for (const date of calDates) {
    console.log(date);
    if ((await date.textContent()) == dateToBeSelected) {
      if (await date.isVisible()) {
        date.click();
        break;
      }
    } else {
      console.log("Please choose date within 378 days");
      break;
    }
  }
}

async function selectDepartDate(
  monthSelector: string,
  monthToBeSelected: string,
  dateLocator: string,
  dateToBeSelected: string,
  nextMonthLocator: string
) {
  let counter = 0;
  while (true) {
    let displayedMonths = await page.locator(monthSelector).allTextContents();
    console.log(`inside loop ${++counter} , ${displayedMonths}`);
    if (displayedMonths.includes(monthToBeSelected)) {
      await selectDate(dateLocator, dateToBeSelected);
      break;
    } else {
      if (await page.locator(nextMonthLocator).isVisible()) {
        await page.locator(nextMonthLocator).click();
      } else {
        console.log("Cannot select journey date of one year later ");
        break;
      }
    }
  }
}
