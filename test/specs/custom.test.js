const { expect } = require("chai");
const { accounts } = require("../../configs/accounts.js");
const { testData } = require("../../configs/testdata.js");
const { paths } = require("../../configs/paths.js");
const { devicesUDID } = require("../../configs/udids.js");

const BrowserInteraction = require("../../utils/browser-interaction.js"); 
const AuthorizationPage = require("../pages/authorization.page.js");
const ServicesPage = require("../pages/services.page.js");
const TransferPage = require("../pages/transfer.page.js");

const browserInteraction = new BrowserInteraction();
const authorizationPage = new AuthorizationPage();
const servicesPage = new ServicesPage();
const transferPage = new TransferPage();

describe("Proof of concept", () => {
  describe("Main screen", () => {
    const telnumber = testData.pay_mobile_beeline;
      amount = "1 000",
      comment = "Test comment",
      image_passport = testData.passport_image_name, 
      series_passport = testData.passport_series, 
      number_passport = testData.passport_number;

    let location = {
      top: 0,
      bottom: 550,
      left: 0,
      middle: 650,
      right: 1300,
    }
    
    let size = {
      height: 500,
      width: 550
    }

    before(async () => {
      await driver.reset();
      await authorizationPage.authorization(accounts.account.phone, accounts.account.password, accounts.account.otp, accounts.account.pin);
    });

    beforeEach(async () => {
      await driver.launchApp();

      await authorizationPage.enterPin(accounts.account.pin);
    });

    afterEach(async () => {
      await driver.closeApp();
    });

    it("Checking qr code reading", async () => {
      switch (driver.capabilities.deviceUDID) {
        case devicesUDID.devicesArray[0]:
          await browserInteraction.openFileInBrowser(paths.images.image_qr, size.width, size.height, location.left, location.bottom);
          break;
        case devicesUDID.devicesArray[1]:
          await browserInteraction.openFileInBrowser(paths.images.image_qr, size.width, size.height, location.middle, location.bottom);
          break;
        case devicesUDID.devicesArray[2]:
          await browserInteraction.openFileInBrowser(paths.images.image_qr, size.width, size.height, location.right, location.bottom);
          break;
        default:
          console.error(`UDID doesn't match to any device! driver id = ${driver.capabilities.deviceUDID}`);
          break;
      }

      await transferPage.goToQRpay();
      await transferPage.enterPaymentData(telnumber, amount);

      let checkammout = await transferPage.getCheckOutAmount();
      expect(checkammout).to.equal(`${amount}.00 сум`);

      await browserInteraction.closePBrowser();
    });

    it("Checking card number reading", async () => {
      switch (driver.capabilities.deviceUDID) {
        case devicesUDID.devicesArray[0]:
          await browserInteraction.openFileInBrowser(paths.images.image_card, size.width, size.height, location.left, location.bottom);
          break;
        case devicesUDID.devicesArray[1]:
          await browserInteraction.openFileInBrowser(paths.images.image_card, size.width, size.height, location.middle, location.bottom);
          break;
        case devicesUDID.devicesArray[2]:
          await browserInteraction.openFileInBrowser(paths.images.image_card, size.width, size.height, location.right, location.bottom);
          break;
        default:
          console.error(`UDID doesn't match to any device! driver id = ${driver.capabilities.deviceUDID}`);
          break;
      }

      await transferPage.goToTransaction();
      await transferPage.scanCard();
      await transferPage.enterTransactionData(amount, comment);

      // assertion next

      await browserInteraction.closePBrowser();
    });

    it("Upload passport image to MIB", async () => { // works on samsung S9
      await servicesPage.goToMIB();
      await servicesPage.mibPage.uploadPassportImage(image_passport);

      let check_passport = await servicesPage.mibPage.getPassportData();
      expect(check_passport.passport_series).to.equal(series_passport);
      expect(check_passport.passport_number).to.equal(number_passport);
    });

    it.skip("Playground", async () => {
      let data = Buffer.from("Hello World").toString("base64");
      await driver.pushFile("/sdcard/Download/testfile.pdf", data);

      await driver.pause(10000);
    });
  });
});