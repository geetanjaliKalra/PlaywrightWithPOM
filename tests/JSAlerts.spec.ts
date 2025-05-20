import test, { Browser, chromium, expect, Page } from "@playwright/test";

let browser: Browser;
let page: Page;
test("File upload test alert", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", async (alert) => {
    expect(alert.type()).toBe("alert");
    alert.accept();
    expect(await page.locator("#result")).toHaveText(
      "You successfully clicked an alert"
    );
    await page.waitForTimeout(5000);
  });

  await page.getByText("Click for JS Alert").click();
});

test.only("File upload test confirmation alert ", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", async (alert) => {
    expect(alert.type()).toBe("confirm");
    alert.accept();
    expect(await page.locator("#result")).toHaveText("You clicked: Ok");
    await page.waitForTimeout(5000);
  });

  await page.getByText("Click for JS Confirm").click();
});

test.only("File upload test confirmation prompt ", async () => {
  browser = await chromium.launch({ channel: "chrome", headless: false });
  page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", async (alert) => {
    expect(alert.type()).toBe("prompt");
    console.log(alert.type());

    let text = "Geetu";
    alert.accept(text);
    expect(await page.locator("#result")).toHaveText(`You entered: ${text}`);
  });

  await page.getByText("Click for JS Prompt").click();
  await page.waitForTimeout(5000);
});
