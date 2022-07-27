let MainPage = require("./main.page.js");
let locator = require("../locators/payment.locators.js");

class PaymentPage extends MainPage {
  async getCheckOutTelNumber() {
    await driver.waitUntil(async () => await $(locator.tv_checkouttelnumber).getAttribute("text"), 2000);
    return $(locator.tv_checkouttelnumber).getText();
  }

  async getCheckOutAmount() {
    // await driver.waitUntil(async () => await $(locator.tv_checkoutamount).getAttribute("text"), 2000);

    await $(locator.tv_checkoutamount).waitUntil(
      async () => {
        return (await $(locator.tv_checkoutamount).getText()).includes("сум");
      },
      {
        timeout: 10000,
        timeoutMsg: "The amount is not displayed on the page!",
      }
    );

    return $(locator.tv_checkoutamount).getText();
  }

  async payCheck(otpcode) {
    await $(locator.btn_pay).waitForEnabled({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "Pay button not enable!",
    });
    await $(locator.btn_pay).click();

    // input OTP code
    if (otpcode) {
      try {
        await $(locator.input_otp).addValue(otpcode);
        await $(locator.btn_done).click();
      } catch (error) {
        console.error("OTP page not found!", error);
      }
    }
  }

  async getPaymentInfo() {
    return $(locator.tv_paymentmsg).getText();
  }

  async enterTransactionData(amount, comment) {
    await $(locator.input_transactionamount).addValue(amount);
    await $(locator.input_comment).addValue(comment);
    await $(locator.btn_next).click();
  }

  // async makeTransaction(amount, comment)  { }

  async enterPaymentData(telnumber, amount) {
    await $(locator.input_paymentamount).waitForExist({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "Input for entering the payment amount was not found!",
    });

    if (telnumber) await $(locator.input_telnumber).addValue(telnumber);
    if (amount) await $(locator.input_paymentamount).addValue(amount);
    await $(locator.btn_next).click();
  }

  async enterSarkorData(prefix, login, amount) {
    await $(locator.input_paymentamount).waitForExist({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "Input for entering the payment amount was not found!",
    });

    if (prefix) {
      await $(locator.dropdownPrefix()).click();
      await $(locator.selectPrefix(prefix)).click();
    }
    if (login) await $(locator.input_login).addValue(login);
    if (amount) await $(locator.input_paymentamount).addValue(amount);
    await $(locator.btn_next).click();
  }

  async getSarkorPrefixAndLogin(prefix) {
    let arr = [];
    arr.push(await $(locator.dropdownPrefix(prefix)).getText(), await $(locator.input_login).getText());
    return arr;
  }

  async searchMerch(merchname) {
    try {
      // closing error message
      await $(locator.btn_bannerclose).click();
    } catch (error) {
      console.error(error);
    }

    await $(locator.input_search).click();
    await $(locator.input_search).addValue(merchname);

    await $(locator.elem_searchresult).waitForExist({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "Element was not found!",
    });
    await $(locator.elem_searchresult).click();
  }

  async goToAllMerchants() {
    await $(locator.elem_allmerchants).click();
  }

  async selectMerch(merchname) {
    await $(locator.selectMerch(merchname)).click();
  }

  async saveToFavorites(title, homename) {
    try {
      // closing error message
      await $(locator.btn_bannerclose).click();
    } catch (error) {
      console.error(error);
    }

    if (homename) {
      await $(locator.btn_templateaddsuccess).click();
      await $(locator.selectWhereToSave(homename)).waitForEnabled({
        timeout: 10000,
        interval: 1000,
        timeoutMsg: "Save button not enable!",
      });
      await $(locator.selectWhereToSave(homename)).click();
    } else {
      await $(locator.btn_templateaddcheckout).click();
    }

    await $(locator.input_templatename).addValue(title);
    await $(locator.btn_templatesave).waitForEnabled({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "Save button not enable!",
    });
    await $(locator.btn_templatesave).click();
  }

  async goBackFromSuccessPage() {
    await $(locator.btn_goback).click();
  }

  async selectHint(hint) {
    await $(locator.selectHint(hint)).click();
  }

  async getPaymentAmount() {
    return $(locator.input_paymentamount).getText();
  }
}

module.exports = PaymentPage;
