let MainPage = require("./main.page.js");
let locator = require("../locators/services.locators.js");

class ServicesPage extends MainPage {
  async goToMIB() {
    await $(locator.tab_services).click();
    await $(locator.btn_mib).click();
    await $(locator.btn_mibcheck).click();
  }

  mibPage = {
    async uploadPassportImage(image_passport) {
      await $(locator.btn_mibscandoc).click();
      await $(locator.btn_mibupload).click();
  
      await $(locator.selectImage(image_passport)).click();
  
      try {
        await $(locator.toast_mib).click();
      } catch (error) {
        console.error(error);
      }
    },
  
    async getPassportData() {
      return {
        passport_series: await $(locator.input_mibseries).getText(),
        passport_number: await $(locator.input_mibnumber).getText(),
      };
    }
  };
}

module.exports = ServicesPage;
