let MainPage = require("./main.page.js");
let locator = require("../locators/savedpayments.locators.js");

class SavedPaymentsPage extends MainPage {
  async selectSavedPayment(merch) {
    await $(locator.selectSavedPayment(merch)).click();
  }
}

module.exports = SavedPaymentsPage;
