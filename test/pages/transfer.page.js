let PaymentPage = require("./payment.page.js");
let locator = require("../locators/payment.locators.js");

class TransferPage extends PaymentPage {
  async scanCard() {
    await $("id=uz.dida.payme:id/btnScan").click();

    try {
      await $("id=uz.dida.payme:id/llCameraScan").click();
    } catch (error) {
      console.error(error);
    }
  }

  async enterTransactionData(amount, comment) {
    await $(locator.input_transactionamount).addValue(amount);
    await $(locator.input_comment).addValue(comment);
    await $(locator.btn_next).click();
  }

  // async makeTransaction(amount, comment)  { }
}

module.exports = TransferPage;
