const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Builder, Browser, By } = require("selenium-webdriver");

test("TC04 - Trang đăng nhập hiển thị thành công", async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("http://127.0.0.1:3000/login");

    const loginForm = await driver.findElement(
      By.css('form.profile_form[data-account-form="login"]'),
    );

    assert.equal(
      await loginForm.isDisplayed(),
      true,
      "Form đăng nhập phải hiển thị",
    );

    const phoneInput = await loginForm.findElement(
      By.css('input[name="phone"]'),
    );

    assert.equal(
      await phoneInput.isDisplayed(),
      true,
      "Trường số điện thoại phải hiển thị",
    );

    const passwordInput = await loginForm.findElement(
      By.css('input[name="password"]'),
    );

    assert.equal(
      await passwordInput.isDisplayed(),
      true,
      "Trường mật khẩu phải hiển thị",
    );

    const loginButton = await loginForm.findElement(
      By.css('button.profile__save[type="submit"]'),
    );

    assert.equal(
      await loginButton.isDisplayed(),
      true,
      "Nút đăng nhập phải hiển thị",
    );

    console.log("TC04 PASSED: Form đăng nhập hiển thị đầy đủ");
  } finally {
    await driver.quit();
  }
});
