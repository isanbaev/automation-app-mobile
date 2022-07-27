let MainPage = require("./main.page.js");
let locator = require("../locators/profile.locators.js");

class ProfilePage extends MainPage {
  async changeProfile() {
    await $(locator.scrollToElement(locator.btn_changeprofile.slice(3))).click();
    await $(locator.btn_confirm).click();
  }

  async deleteProfile(password) {
    await $(locator.btn_deleteprofile).click();
    await $(locator.input_password).addValue(password);
    await $(locator.btn_done).waitForEnabled({ timeout: 10000, interval: 1000 });
    await $(locator.btn_done).click();
  }
}

module.exports = ProfilePage;
