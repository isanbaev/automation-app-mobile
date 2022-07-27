const { expect } = require("chai");
const { accounts } = require("../../configs/accounts.js");
const { testData } = require("../../configs/testdata.js");

const AuthorizationPage = require("../pages/authorization.page.js");
const MainPage = require("../pages/main.page.js");
const PaymentPage = require("../pages/payment.page.js");
const SavedPaymentsPage = require("../pages/savedpayments.page.js");
const MyHomePage = require("../pages/myhome.page.js");

describe("Автоподсказки под полями ввода", () => {
  const authorizationPage = new AuthorizationPage();
  const mainPage = new MainPage();
  const paymentPage = new PaymentPage();
  const savedPaymentsPage = new SavedPaymentsPage();
  const myHomePage = new MyHomePage();

  const merchmobile = testData.name_merch_mobile,
    telnumber = testData.pay_mobile_uzmobile,
    merchdinamicprefix = testData.name_merch_sarkor,
    dinamicprefix = testData.sarkor_prefix,
    login = testData.sarkor_login,
    homename = testData.name_home_main,
    amount = 500,
    addend = 100;

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

  it("Авторекомендации в терминале и и сохраненных платежах мобильного оператора", async () => {
    await mainPage.goToPayment();

    await paymentPage.searchMerch(merchmobile);
    // or
    // await paymentPage.goToAllMerchants();
    // await paymentPage.selectMerch(merchmobile);

    await paymentPage.enterPaymentData(telnumber, amount);
    await paymentPage.saveToFavorites(`test ${merchmobile}`);
    await paymentPage.payCheck(accounts.account.otp);

    await paymentPage.saveToFavorites(`test ${merchmobile}`, homename);

    await paymentPage.goBackFromSuccessPage();
    await mainPage.openSavedPayments();

    await savedPaymentsPage.selectSavedPayment(merchmobile);
    await paymentPage.selectHint(amount);

    await paymentPage.enterPaymentData(null, amount + addend);
    await paymentPage.payCheck();
    await paymentPage.goBackFromSuccessPage();

    await mainPage.goToPayment();
    await paymentPage.searchMerch(merchmobile);
    await paymentPage.selectHint(amount + addend);

    let selectedamount = await paymentPage.getPaymentAmount();
    expect(selectedamount).to.equal("600 сум");

    await paymentPage.selectHint(amount);

    selectedamount = await paymentPage.getPaymentAmount();
    expect(selectedamount).to.equal("500 сум");
  });

  it.skip("Авторекомендации в поставщиках с динамическим префиксом", async () => {
    let sum = amount;
    let checkarr = [];

    for (let i = 0; i < 2; i++) {
      await mainPage.goToPayment();
      await paymentPage.searchMerch(merchdinamicprefix);

      await paymentPage.enterSarkorData(dinamicprefix, login, sum);
      await paymentPage.saveToFavorites(`test ${merchdinamicprefix}`, homename);
      await paymentPage.payCheck(accounts.account.otp);
      await paymentPage.goBackFromSuccessPage();

      checkarr.push(sum);
      sum += addend;
    }

    for (let i = 0; i < 3; i++) {
      await mainPage.goToPayment();
      await paymentPage.searchMerch(merchdinamicprefix);
      await paymentPage.selectHint(login);

      let prefixlogin = await paymentPage.getSarkorPrefixAndLogin(dinamicprefix);
      expect(prefixlogin).to.deep.equal([dinamicprefix, String(login)]);

      await paymentPage.enterSarkorData(null, null, sum);
      await paymentPage.payCheck(accounts.account.otp);
      await paymentPage.goBackFromSuccessPage();

      checkarr.push(sum);
      sum += addend;
    }

    await paymentPage.openMyHome();
    await myHomePage.selectSavedPayment(login);
    await myHomePage.openSinglePay();

    let hints = await myHomePage.getAllHints();
    expect(hints.length).to.equal(5);

    await myHomePage.selectHint(5);

    let checkamount = await myHomePage.getAmount();
    expect(checkamount).to.equal(amount + addend * 5);

    await myHomePage.enterAmount(amount);

    await myHomePage.openSinglePay();

    hints = await myHomePage.getAllHints();
    expect(hints).to.deep.equal(checkarr);
  });

  it.skip("Авторекомендации в терминале ATTO и дробные суммы c разными картами", async () => {
    /*
  step {action: "На главной странице перейти в оплата услуг и выбрать поставщика ATTO"}
  step {action: "На поле ввода номер транспортной карты ввести валидный номер"}
  step {result: "Поле заполняется, ошибок нет"}
  step {action: "На поле ввода сумма платежа ввести дробную сумму с тийинами (например 1000.32)"}
  step {result: "Поле заполняется"}
  step {action: "Нажать на кнопку Продолжить"}
  step {result: "Появляется чекаут с заполненными данными, где есть название терминала, номер транспортной карты, баланс, сумма с тийинами "}
  step {action: "Нажать на кнопку Оплатить "}
  step {result: "Появляется страница Success page"}
  step {action: "Сохранить платеж в Сохраненные платежи"}
  step {action: "Нажать на \"Вернуться в приложение\""}
  step {action: "Перейти в последний сохраненный платеж этого поставщика"}
  step {result: "Под полем номер транспортной карты и сумма платежа сохранились автоподсказки с последними введенными данными "}
  step {action: "Повторить Шаги 2-8 с разными картами 4 раза"}
  step {action: "Перейти в Сохраненку этого поставщика"}
  step {result: "Под полем номер транспортной карты сохранились 5 разные карты с автоподсказками"}
  step {result: "Под полем сумма платежа сохранилась одна сумма (1000.32)"}
  step {action: "Под полем номер транспортной карты выбрать последнюю подсказку справа"}
  step {result: "Автоподсказка вставляется и поле заполняется данными"}
  step {action: "Перейти в терминал этого поставщика "}
  step {result: "Авто-подсказки под полями карты и суммы отображаются идентичные подсказки как и в сохраненных платежах"}
  */
  });

  // it("Авторекомендации после обновления версии из Play Market и App Store с переходами по диплинкам", async () => {}); пока не делаем
});
