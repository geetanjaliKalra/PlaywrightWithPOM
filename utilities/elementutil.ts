import { Locator, Page } from "@playwright/test";

export async function fillInput(page: Page, selector: string, value: string) {
  nullCheck(value);
  await page.fill(selector, value);
}

export async function fillInputUsingPlaceholder(
  page: Page,
  selector: string,
  value: string
) {
  nullCheck(value);
  await page.getByPlaceholder(selector).fill(value);
}

export async function doClickUsingRole(
  page: Page,
  role: string,
  productName: string
) {
  await page.getByRole("link", { name: productName }).first().click();
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
  const elementLabel: string[] = [];
  console.log(`Length of elemets is ${elements.length}`);
  console.log(`testing what is printing in elements ${elements}`);
  for (const e of elements) {
    console.log(`Elements text is ${e}`);
    elementLabel.push(e);
  }
  console.log(elementLabel);
  return elementLabel;
}

// export async function getAllElementsText(page: Page, selector: string) {
//   const elementLocators = await page.locator(selector).all();
//   const elementText: string[] = [];
//   for (const e of elementLocators) {
//     const text = await e.locator("a").first().textContent();
//     if (text !== null) {
//       elementText.push(text);
//     }
//   }
//   return elementText;
// }

export async function getElementCount(page: Page, selector: string) {
  await page.locator(selector).first().waitFor({ state: "visible" });
  const elementsCount = await page.locator(selector).count();
  console.log(`Inside util getElementCount ${elementsCount}`);
  return elementsCount;
}
