import { Locator, Page } from "@playwright/test";

export async function fillInput(locator: Locator, value: string) {
  await locator.waitFor({ state: "visible" });
  nullCheck(value);
  await locator.fill(value);
}

function nullCheck(value: string) {
  if (value === null) {
    console.log("Value is null");
    throw new Error("Value is null");
  }
}
export async function doClick(locator: Locator) {
  await locator.waitFor({ state: "visible" });
  await locator.click();
}

export async function getAllElements(page: Page, selector: string) {
  const elements = await page.locator(selector).allTextContents();
  for (const e of elements) {
    console.log(`Grid has below links ${e}`);
  }
  return elements;
}
