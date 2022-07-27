let locator = require("../locators/authorization.locators.js");

class AuthorizationPage {
  constructor() {}

  async selectLanguage(lang) {
    switch (lang) {
      case "ru":
        await $(locator.btn_russian).click();
        break;
      case "uz":
        await $(locator.btn_uzbek).click();
        break;
      case "en":
        await $(locator.btn_english).click();
        break;
      default:
        console.error(`Please provide correct language property (ru, uz, en)! Provided property: ${lang} incorrect!`);
        break;
    }
  }

  async enterPhoneNumber(phone) {
    try {
      await driver.waitUntil(
        async () => {
          return driver.isKeyboardShown();
        },
        { timeout: 10000, interval: 1000 }
      );
    } catch (error) {
      console.error(error);
    }

    await $(locator.input_phone).setValue(phone);
  }
  
  async forgotPassword(phone, otp, newpassword) {
    await this.enterPhoneNumber(phone);
    await $(locator.btn_done).click();

    await this.enterOTP(otp, false);

    await $(locator.input_password).addValue(newpassword);
    await $(locator.input_checkpassword).addValue(newpassword);
    
    await $(locator.btn_done).waitForEnabled({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "Done button not enable!",
    });
    await $(locator.btn_done).click();
  }

  async enterCredentials(phone, password, newacc) {
    await this.enterPhoneNumber(phone);
    if (newacc) {
      await $(locator.btn_registration).waitForEnabled({
        timeout: 10000,
        interval: 1000,
        timeoutMsg: "Registration button not enable!",
      });
      await $(locator.btn_registration).click();
    }
    await $(locator.input_password).addValue(password);
    await $(locator.btn_next).click();
  }

  async getDoneButtonText() {
    return $(locator.btn_done).getText();
  }

  async checkOtpPage() {
    await $(locator.cb_nottrusted).waitForExist();
    return $(locator.cb_nottrusted).isExisting();
  }

  async enterOTP(otpcode, nottrustchecked) {
    await $(locator.input_otp).waitForExist({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "OTP input not found!",
    });
    await $(locator.input_otp).addValue(otpcode);

    if (nottrustchecked) await $(locator.cb_nottrusted).click();

    await $(locator.btn_done).waitForEnabled({
      timeout: 10000,
      interval: 1000,
      timeoutMsg: "Done button not enable!",
    });
    await $(locator.btn_done).click();
  }

  async skipPage() {
    await $(locator.btn_done).click();
  }

  async closeWelcomePopUp() {
    await $(locator.btn_closepopup).click();
  }

  async checkBottomSheet() {
    await $(locator.btmsheet_addcard).waitForExist();
    return $(locator.btmsheet_addcard).isExisting();
  }

  async skipBottomSheet() {
    await $(locator.btn_skipbtmsheet);
  }

  async enterPin(pin) {
    for (let i = 0; i < 2; i++) {
      for (let char of pin) {
        try {
          await driver.pause(500);

          switch (char) {
            case "0":
              await $(locator.selectNumber("Zero")).click();
              break;
            case "1":
              await $(locator.selectNumber("One")).click();
              break;
            case "2":
              await $(locator.selectNumber("Two")).click();
              break;
            case "3":
              await $(locator.selectNumber("Three")).click();
              break;
            case "4":
              await $(locator.selectNumber("Four")).click();
              break;
            case "5":
              await $(locator.selectNumber("Five")).click();
              break;
            case "6":
              await $(locator.selectNumber("Six")).click();
              break;
            case "7":
              await $(locator.selectNumber("Seven")).click();
              break;
            case "8":
              await $(locator.selectNumber("Eight")).click();
              break;
            case "9":
              await $(locator.selectNumber("Nine")).click();
              break;
            default:
              console.error("Provide correct string PIN!");
              break;
          }
        } catch (error) {
          console.error("Pin page not displayed!", error);
          break;
        }
      }
    }
  }

  async checkMainPage() {
    await $(locator.btn_paymego).waitForExist();
    return $(locator.btn_paymego).isExisting();
  }

  async authorization(phone, password, otp, pin) {
    try {
      await this.selectLanguage("ru");
    } catch (error) {
      console.error("There is no language selection.");
    }

    await this.enterCredentials(phone, password);
    await this.enterOTP(otp);
    await this.enterPin(pin);
    await this.skipPage();
    await this.skipPage();

    try {
      await this.closeWelcomePopUp();
    } catch (error) {
      console.error("There is no welcome pop-up.");
    }
  }
}

module.exports = AuthorizationPage;