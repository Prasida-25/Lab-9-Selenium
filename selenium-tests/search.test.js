const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Builder, Browser, By, until } = require("selenium-webdriver");

test("TC03 - Tìm kiếm sản phẩm theo từ khóa", async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("http://127.0.0.1:3000/products");

    const searchInput = await driver.findElement(
      By.css(".header__search-input"),
    );

    await searchInput.sendKeys("SSD Kingston");

    const searchButton = await driver.findElement(
      By.css(".header__search-btn"),
    );

    await searchButton.click();

    await driver.wait(until.urlContains("/products/search"), 5000);

    const currentUrl = await driver.getCurrentUrl();
    const searchUrl = new URL(currentUrl);
    const keyword = searchUrl.searchParams.get("q");

    assert.equal(
      keyword,
      "SSD Kingston",
      "Từ khóa tìm kiếm phải được gửi chính xác",
    );

    console.log("TC03 PASSED: Đã gửi đúng từ khóa tìm kiếm");
  } finally {
    await driver.quit();
  }
});
