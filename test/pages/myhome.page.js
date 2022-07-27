let MainPage = require("./main.page.js");
let locator = require("../locators/myhome.locators.js");

class MyHomePage extends MainPage {
  async selectSavedPayment(merchlogin) {
    await $(locator.selectSavedPayment(merchlogin)).click();
  }

  async openSinglePay() {
    await $(locator.btn_amount).click();
  }

  async enterAmount(amount) {
    await $(locator.input_amount).addValue(amount);
    await $(locator.btn_next).click();
  }

  async selectHint(hintnumber) {
    await $(locator.selectHint(hintnumber)).click();
  }

  async getAmount() {
    return $(locator.input_amount).getText();
  }

  async getAllHints() {
    return $$(locator.btns_hints);
  }
}

module.exports = MyHomePage;
