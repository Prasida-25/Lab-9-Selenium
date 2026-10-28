const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Builder, Browser, until } = require("selenium-webdriver");

test("TC05 - Người chưa đăng nhập được chuyển đến trang đăng nhập khi mở giỏ hàng", async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("http://127.0.0.1:3000/cart");

    await driver.wait(until.urlContains("/login"), 5000);

    const currentUrl = new URL(await driver.getCurrentUrl());

    assert.equal(
      currentUrl.pathname,
      "/login",
      "Người dùng chưa đăng nhập phải được chuyển đến trang đăng nhập",
    );

    assert.equal(
      currentUrl.searchParams.get("returnTo"),
      "/cart",
      "Sau khi đăng nhập, hệ thống cần giữ lại đường dẫn giỏ hàng ban đầu",
    );

    const bodyText = await driver
      .findElement(require("selenium-webdriver").By.css("body"))
      .getText();

    assert.ok(
      bodyText.includes("Số điện thoại") && bodyText.includes("Mật khẩu"),
      "Trang đăng nhập phải hiển thị trường số điện thoại và mật khẩu",
    );

    console.log(
      "TC05 PASSED: Người chưa đăng nhập được chuyển đến trang đăng nhập khi mở giỏ hàng",
    );
  } finally {
    await driver.quit();
  }
});
