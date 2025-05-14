import { Locator, Page } from "@playwright/test";

export async function fillInput(page: Page, selector: string, value: string) {
  nullCheck(value);
  await page.fill(selector, value);
}

function nullCheck(value: string) {
  if (value === null) {
    console.log("Value is null");
    throw new Error("Value is null");
  }
}
export async function doClick(page: Page, selector: string) {
  await page.click(selector);
}

export async function getAllElements(page: Page, selector: string) {
  const elements = await page.locator(selector).allTextContents();
  for (const e of elements) {
    console.log(`Grid has below links ${e}`);
  }
  return elements;
}
