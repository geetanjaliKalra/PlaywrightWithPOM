import test, { Browser, chromium, Page } from "@playwright/test";

let browser: Browser;
let page: Page;

test.only("File upload test confirmation prompt ", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/frames");
  await page.locator("//a[text()='iFrame']").click();

  const iframe = page.frameLocator("//iframe[@title='Rich Text Area']");
  console.log(await iframe.locator("#tinymce").textContent());
});
