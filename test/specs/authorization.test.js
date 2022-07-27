const { expect } = require("chai");
const { accounts } = require("../../configs/accounts.js")
const { devicesUDID } = require("../../configs/udids.js")

const AuthorizationPage = require("../pages/authorization.page.js");
const MainPage = require("../pages/main.page.js");
const SettingsPage = require("../pages/settings.page.js");
const ProfilePage = require("../pages/profile.page.js");

describe("Регистрация и авторизация", () => {
  const authorizationPage = new AuthorizationPage();
  const mainPage = new MainPage();
  const settingsPage = new SettingsPage();
  const profilePage = new ProfilePage();

  let newaccountphone;

  before(async () => {
    if (devicesUDID.devicesArray.includes(driver.capabilities.deviceUDID)) {
      newaccountphone = Number(accounts.newaccount.phone) + devicesUDID.devicesArray.indexOf(driver.capabilities.deviceUDID);
    } else {
      console.error(`UDID doesn't match to any device! driver id = ${driver.capabilities.deviceUDID}, array = ${devicesUDID.devicesArray}`);
    }
  });
  
  describe("Инициализация регистрации", () => {
    beforeEach(async () => {
      await driver.reset();
      await driver.launchApp();
    });

    afterEach(async () => {
      await driver.closeApp();
    });

    it("Выбор языка ru", async () => {
      await authorizationPage.selectLanguage("ru");
      await authorizationPage.enterPhoneNumber(accounts.account.phone);

      let btn_text = await authorizationPage.getDoneButtonText();
      expect(btn_text).to.equal("Забыли пароль");
    });

    it("Выбор языка uz", async () => {
      await authorizationPage.selectLanguage("uz");
      await authorizationPage.enterPhoneNumber(accounts.account.phone);

      let btn_text = await authorizationPage.getDoneButtonText();
      expect(btn_text).to.equal("Parolni unutdingizmi");
    });

    it("Выбор языка en", async () => {
      await authorizationPage.selectLanguage("en");
      await authorizationPage.enterPhoneNumber(accounts.account.phone);

      let btn_text = await authorizationPage.getDoneButtonText();
      expect(btn_text).to.equal("Forgot password");
    });
  });

  describe("Регистрация и авторизация нового пользователя", () => {
    beforeEach(async () => {
      await driver.reset();
      await driver.launchApp();
    });

    afterEach(async () => {
      await driver.closeApp();
    });

    it("Первая регистрация", async () => {
      await authorizationPage.selectLanguage("ru");
      await authorizationPage.enterCredentials(newaccountphone, accounts.newaccount.password, true);
      await authorizationPage.enterOTP(accounts.newaccount.otp);
      await authorizationPage.enterPin(accounts.newaccount.pin);
      await authorizationPage.skipPage();
      await authorizationPage.skipPage();

      let bottomsheet = await authorizationPage.checkBottomSheet();
      expect(bottomsheet).to.be.true;

      await authorizationPage.skipBottomSheet();
    });

    it("Забыль пароль", async () => {
      await authorizationPage.selectLanguage("ru");
      await authorizationPage.forgotPassword(newaccountphone, accounts.newaccount.otp, accounts.newaccount.password);

      await authorizationPage.authorization(newaccountphone, accounts.newaccount.password, accounts.newaccount.otp, accounts.newaccount.pin);

      let mainpagetitle = await authorizationPage.checkMainPage();
      expect(mainpagetitle).to.be.true;
    });

    it("Первая авторизация", async () => {
      await authorizationPage.selectLanguage("ru");
      await authorizationPage.enterCredentials(accounts.account.phone, accounts.account.password);
      await authorizationPage.enterOTP(accounts.account.otp);
      await authorizationPage.enterPin(accounts.account.pin);
      await authorizationPage.skipPage();
      await authorizationPage.skipPage();
      await authorizationPage.closeWelcomePopUp();

      let mainpagetitle = await authorizationPage.checkMainPage();
      expect(mainpagetitle).to.be.true;
    });

    it("Повторная авторизация", async () => {
      await authorizationPage.selectLanguage("ru");
      await authorizationPage.enterCredentials(newaccountphone, accounts.newaccount.password);
      await authorizationPage.enterOTP(accounts.newaccount.otp);
      await authorizationPage.enterPin(accounts.newaccount.pin);
      await authorizationPage.skipPage();
      await authorizationPage.skipPage();
      await authorizationPage.closeWelcomePopUp();

      let mainpagetitle = await authorizationPage.checkMainPage();
      expect(mainpagetitle).to.be.true;
    });

    // it("Авторизация на тестовый аккаунт)", async () => { нет пока необходимости
    // });

    it("Чек-бокс доверенных устройств вкл", async () => {
      await authorizationPage.selectLanguage("ru");
      await authorizationPage.enterCredentials(accounts.account.phone, accounts.account.password);
      await authorizationPage.enterOTP(accounts.account.otp, true);
      await authorizationPage.closeWelcomePopUp();

      let mainpagetitle = await authorizationPage.checkMainPage();
      expect(mainpagetitle).to.be.true;

      await driver.closeApp();
      await driver.launchApp();
      await authorizationPage.enterCredentials(accounts.account.phone, accounts.account.password);

      let otppagecheckbox = await authorizationPage.checkOtpPage();
      expect(otppagecheckbox).to.be.true;
    });

    // it("Чек-бокс доверенных устройств выкл", async () => { дублирует тест повторной авторизации
    // });
  });

  describe("Валидация при Регистрации/Авторизации", () => {
    before(async () => {
      await driver.reset();
      await driver.launchApp();
      await authorizationPage.authorization(accounts.account.phone, accounts.account.password, accounts.account.otp, accounts.account.pin);
    });

    beforeEach(async () => {
      await driver.launchApp();
    });

    afterEach(async () => {
      await driver.closeApp();
    });

    after(async () => {
      await driver.launchApp();
      await authorizationPage.enterPin(accounts.newaccount.pin);

      await mainPage.openMenu();
      await mainPage.goToSettings();

      await settingsPage.goToProfile();

      await profilePage.deleteProfile(accounts.newaccount.password);
    });

    // it("Вход по отпечатку пальца", async () => { в разработке...
    // });

    it("Неверный ПИН", async () => {
      for (let i = 0; i < 2; i++) { // исправить количество итераций при работе с продом
        await authorizationPage.enterPin("1234");
      }

      await authorizationPage.authorization(accounts.account.phone, accounts.account.password, accounts.account.otp, accounts.account.pin);

      let mainpagetitle = await authorizationPage.checkMainPage();
      expect(mainpagetitle).to.be.true;
    });

    // it('Поле "пароль"', async () => { приложение работает не так как описанно в тест-кейсе
    // });

    it("Выход из приложения и авторизация", async () => {
      await authorizationPage.enterPin(accounts.account.pin);

      await mainPage.openMenu();
      await mainPage.goToSettings();

      await settingsPage.goToProfile();

      await profilePage.changeProfile();

      await authorizationPage.enterCredentials(newaccountphone, accounts.newaccount.password);
      await authorizationPage.enterOTP(accounts.newaccount.otp);
      await authorizationPage.enterPin(accounts.newaccount.pin);
      await authorizationPage.skipPage();
      await authorizationPage.skipPage();

      let mainpagetitle = await authorizationPage.checkMainPage();
      expect(mainpagetitle).to.be.true;
    });

    it("Удаление аккаунта", async () => {
      await authorizationPage.enterPin(accounts.newaccount.pin);

      await mainPage.openMenu();
      await mainPage.goToSettings();

      await settingsPage.goToProfile();

      await profilePage.deleteProfile(accounts.newaccount.password);

      await authorizationPage.enterPhoneNumber(accounts.account.phone);

      let btn_text = await authorizationPage.getDoneButtonText();
      expect(btn_text).to.equal("Забыли пароль");
    });

    it("Выход из приложения и регистрация", async () => {
      await authorizationPage.authorization(accounts.account.phone, accounts.account.password, accounts.account.otp, accounts.account.pin);

      await mainPage.openMenu();
      await mainPage.goToSettings();

      await settingsPage.goToProfile();

      await profilePage.changeProfile();

      await authorizationPage.enterCredentials(newaccountphone, accounts.newaccount.password, true);
      await authorizationPage.enterOTP(accounts.newaccount.otp);
      await authorizationPage.enterPin(accounts.newaccount.pin);
      await authorizationPage.skipPage();
      await authorizationPage.skipPage();

      let bottomsheet = await authorizationPage.checkBottomSheet();
      expect(bottomsheet).to.be.true;

      await authorizationPage.skipBottomSheet();
    });
  });
});
