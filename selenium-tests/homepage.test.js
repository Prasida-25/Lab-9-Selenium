const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Builder, Browser, By } = require("selenium-webdriver");

test("TC01 - Trang chủ TechZone hiển thị thành công", async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("http://127.0.0.1:3000/");

    const title = await driver.getTitle();

    assert.equal(title, "TechZone");

    const logo = await driver.findElement(
      By.css('a[aria-label="Trang chủ TechZone"]'),
    );

    assert.equal(await logo.isDisplayed(), true);

    console.log("TC01 PASSED: Trang chủ TechZone hiển thị thành công");
  } finally {
    await driver.quit();
  }
});
