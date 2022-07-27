let AuthorizationPage = require("./authorization.page.js");
let locator = require("../locators/main.locators.js");
const { accounts } = require("../../configs/accounts.js");

class MainPage extends AuthorizationPage {
  async openMenu() {
    await $(locator.btn_menu).click();
  }

  async goToSettings() {
    await $(locator.btn_settings).click()
  }

  async goToQRpay() {
    await $(locator.btn_qrpay).click();
  }

  async goToTransaction() {
    await $(locator.tab_transaction).click();
  }

  async goToPayment() {
    await $(locator.tab_payment).click();
  }
  
  async getHeader() {
    return $(locator.tv_header).getText();
  }

  async openSavedPayments() {
    await $(locator.elem_savedpayments).click();
    try {
      await $(locator.btn_closepopup).click();      
    } catch (error) {
      console.error(error)
    }
  }

  async openMyHome() {
    await $(locator.scrollToElement(locator.btn_myhome.slice(3))).click();
  }

  async scrollPage(startX, StartY, EndX, EndY) {
    driver.touchAction([
      { action: 'press', x: startX, y: StartY },
      { action: 'moveTo', x: EndX, y: EndY },
      'release'
    ]);
  }

  async followDeepLink(link) {
    // await driver.url(link);
    await driver.execute("mobile:deepLink", {
      url: link,
      package: "uz.dida.payme",
    });

    await this.enterPin(accounts.account.pin);
  }
}

module.exports = MainPage;
