module.exports = {
  // language select
  btn_russian: '//android.widget.TextView[matches(@text, "русский", "i")]',
  btn_uzbek: '//android.widget.TextView[matches(@text, "zbekcha", "i")]',
  btn_english: '//android.widget.TextView[matches(@text, "english", "i")]',

  // authorization page
  input_phone: "id=uz.dida.payme:id/editTextPhone",
  input_password: "id=uz.dida.payme:id/editTextPassword",
  input_checkpassword: "id=uz.dida.payme:id/editTextCheckPass",
  btn_clearphone: null,
  btn_hidepassword: null,
  btn_next: "id=uz.dida.payme:id/btnNext",
  btn_registration: "id=uz.dida.payme:id/btnRegister",

  // general
  btn_done: "id=uz.dida.payme:id/tvAction",

  // otp page
  input_otp: "id=uz.dida.payme:id/editTextVerifyCode",
  btn_resend: null,
  cb_nottrusted: "id=uz.dida.payme:id/trustSwitch",

  // pin page
  selectNumber(number) {
    return `id=uz.dida.payme:id/key${number}`;
  },
  btn_2: "id=uz.dida.payme:id/keyTwo",
  btn_skip: null,

  // biometric page

  // first login pop-up
  btn_closepopup: "id=uz.dida.payme:id/btnClose",

  // main page
  btn_paymego: "id=uz.dida.payme:id/btnFastPay",
  btn_notification: "id=uz.dida.payme:id/action_notifications",
  tabbar: "id=uz.dida.payme:id/bottom_navigation",
  btmsheet_addcard: "id=uz.dida.payme:id/design_bottom_sheet",
  btn_skipbtmsheet: "id=uz.dida.payme:id/btnSkip",
};