const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Builder, Browser, By } = require("selenium-webdriver");

test("TC02 - Trang danh sách sản phẩm hiển thị thành công", async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("http://127.0.0.1:3000/products");

    // Kiểm tra tiêu đề trang
    const heading = await driver.findElement(
      By.xpath("//*[normalize-space(text())='Tất cả sản phẩm']"),
    );

    assert.equal(await heading.isDisplayed(), true);

    // Kiểm tra ô tìm kiếm trên giao diện
    const searchBox = await driver.findElement(
      By.css('input[placeholder="Nhập để tìm kiếm sản phẩm"]'),
    );

    assert.equal(await searchBox.isDisplayed(), true);

    // Kiểm tra trang có sản phẩm hiển thị
    const productCards = await driver.findElements(
      By.css(".listing-product-grid .tz-product-card"),
    );
    assert.ok(
      productCards.length > 0,
      "Danh sách sản phẩm phải có ít nhất một sản phẩm",
    );

    console.log("TC02 PASSED: Trang danh sách sản phẩm hiển thị thành công");
  } finally {
    await driver.quit();
  }
});
