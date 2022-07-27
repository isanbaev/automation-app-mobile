let MainPage = require("./main.page.js");
let locator = require("../locators/settings.locators.js");

class SettingsPage extends MainPage {
  async goToProfile() {
    // let btn_profile = (driver.capabilities.platformVersion <= 6) ? ("//" + locator.btn_profile) : (locator.newversionselector + locator.btn_profile)
    let btn_profile = (driver.capabilities.platformVersion < 6) ? '//android.widget.TextView[@text="Профиль"]' : (locator.newversionselector + locator.btn_profile);

    // if (driver.capabilities.platformVersion <= 6) {
    //   await $(locator.oldversionselector + locator.btn_profile).click();
    // } else {
    //   await $(locator.newversionselector + locator.btn_profile).click();
    // }

    await $(btn_profile).waitForExist();
    await $(btn_profile).click();
  }
}

module.exports = SettingsPage;