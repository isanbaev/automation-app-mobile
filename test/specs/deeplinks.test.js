const { expect } = require("chai");
const { accounts } = require("../../configs/accounts.js");
const { testData } = require("../../configs/testdata.js");

const SendRequests = require("../../utils/api-interaction.js");

const MainPage = require("../pages/main.page.js");
const PaymentPage = require("../pages/payment.page.js");

describe("Deep Links", async () => {
  describe("Checking the opening of deep links", async () => {
    const mainPage = new MainPage();
    const paymentPage = new PaymentPage();

    const uzmobilemerchrequest = new SendRequests(testData.pay_mobile_checkcreate, 50000, testData.ids.merchuzmobileid);

    const telnumber = String(testData.pay_mobile_checkcreate),
      amount = "1 000",
      comment = "Test comment";

    before(async () => {
      await driver.reset();
      await mainPage.authorization(accounts.account.phone, accounts.account.password, accounts.account.otp, accounts.account.pin);
    });

    beforeEach(async () => {
      await driver.launchApp();
      await mainPage.enterPin(accounts.account.pin);
    });

    afterEach(async () => {
      await driver.closeApp();
    });

    it(`Link - ${testData.links.checkpaycom}`, async () => {
      let id = await uzmobilemerchrequest.getMobileCheckId();
      let oldlink = testData.links.checkpaycom;
      let to = oldlink.match(/\/\d/);
      let link = oldlink.substring(0, to.index + 1) + id;

      await mainPage.followDeepLink(link);

      let checktelnumber = await paymentPage.getCheckOutTelNumber();
      let checkamount = await paymentPage.getCheckOutAmount();
      expect(checktelnumber).to.equal(telnumber);
      expect(checkamount).to.contain("500.00");

      await paymentPage.payCheck(accounts.account.otp);

      let msgpayment = await paymentPage.getPaymentInfo();
      expect(msgpayment).to.equal("Оплата успешно проведена");
    });

    it(`Link - ${testData.links.transaction}`, async () => {
      await mainPage.followDeepLink(testData.links.transaction);

      let header = await mainPage.getHeader();
      expect(header).to.equal("Перевод средств");

      await paymentPage.enterTransactionData(amount, comment);

      let checkamount = await paymentPage.getCheckOutAmount();
      expect(checkamount).to.contain(amount);
    });

    it(`Link - ${testData.links.transactionamount}`, async () => {
      await mainPage.followDeepLink(testData.links.transactionamount);

      let checkamount = await paymentPage.getCheckOutAmount();
      expect(checkamount).to.contain(amount);
    });

    it(`Link - ${testData.links.transactionid}`, async () => {
      await mainPage.followDeepLink(testData.links.transactionid);

      await paymentPage.enterTransactionData(amount, comment);

      let checkamount = await paymentPage.getCheckOutAmount();
      expect(checkamount).to.contain(amount);
    });

    it(`Link - ${testData.links.merchant}`, async () => {
      await mainPage.followDeepLink(testData.links.merchant);

      let header = await mainPage.getHeader();
      expect(header).to.equal("Оплата");

      await paymentPage.enterPaymentData(telnumber, amount);

      let checktelnumber = await paymentPage.getCheckOutTelNumber();
      let checkamount = await paymentPage.getCheckOutAmount();
      expect(checktelnumber).to.equal(telnumber);
      expect(checkamount).to.contain(amount);
    });
  });
});
