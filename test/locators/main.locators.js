module.exports = {
  // main page
  tv_header: "id=uz.dida.payme:id/toolbar_title",
  btn_qrpay: "id=uz.dida.payme:id/btnQR",
  elem_savedpayments: "id=uz.dida.payme:id/viewMore",
  btn_closepopup: "id=uz.dida.payme:id/btnClose",
  btn_myhome: "id=uz.dida.payme:id/vpHomes", // id=uz.dida.payme:id/vpHomes    id=uz.dida.payme:id/rlHomesRoot   //android.widget.TextView[@text="Test Home"]
  scrollToElement: (id) => {
    return `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("${id}"))`;
  },

  // menu
  btn_menu: '//android.widget.ImageButton[@content-desc="Drawer Opened"]',
  btn_settings: "id=uz.dida.payme:id/tvSettings", // uz.dida.payme:id/viewSettings
  btn_themes: "id=uz.dida.payme:id/tvThemes",
  btn_share: "id=uz.dida.payme:id/tvShare",
  btn_help: "id=uz.dida.payme:id/tvHelp",

  // bottom tabs
  tab_transaction: "id=uz.dida.payme:id/transferpage",
  tab_payment: "id=uz.dida.payme:id/paymentspage",
};