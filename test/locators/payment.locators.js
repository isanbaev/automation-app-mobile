module.exports = {
  // checkout page
  tv_checkouttelnumber: "id=uz.dida.payme:id/tvValue",
  tv_checkoutamount: "id=uz.dida.payme:id/tvAmount",
  btn_pay: "id=uz.dida.payme:id/btnPay",
  btn_templateaddcheckout: "id=uz.dida.payme:id/btnSave",
  input_templatename: "id=uz.dida.payme:id/editTitle",
  btn_templatesave: "id=uz.dida.payme:id/saveBtn",
  selectWhereToSave(title) {
    return `//android.widget.RadioButton[@text="${title}"]`;
  },

  // otp page
  input_otp: "id=uz.dida.payme:id/editTextCode",
  btn_done: "id=uz.dida.payme:id/tvAction",

  // success page
  tv_paymentmsg: "id=uz.dida.payme:id/tvPaymentMsg",
  btn_templateaddsuccess: "id=uz.dida.payme:id/btnAddToFavorites",
  btn_goback: "id=uz.dida.payme:id/btnGoToPayments",

  // general
  tv_header: "id=uz.dida.payme:id/toolbar_title",
  btn_next: "id=uz.dida.payme:id/btnNext",

  // transaction page
  input_transactionamount: "id=uz.dida.payme:id/editTextAmount",
  input_comment: "id=uz.dida.payme:id/editTextComment",

  // payment page
  input_search: "id=uz.dida.payme:id/search_src_text", // "id=uz.dida.payme:id/search_bar",
  tv_bannermessage: "id=uz.dida.payme:id/tvText",
  btn_bannerclose: "id=uz.dida.payme:id/btnClose",
  elem_searchresult: "//androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]",
  elem_allmerchants: "id=uz.dida.payme:id/btnMorePayments",
  selectMerch(merchname) {
    return `//android.widget.ImageView[matches(@content-desc, "${merchname}", "i")]`;
  },
  selectHint(hint) { 
    return `//android.widget.TextView[matches(@text, "${hint}")]`; //android.widget.TextView[contains(@text, "600")]
  },

  input_telnumber: '//android.widget.EditText[@content-desc="Номер телефона"]', //android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.EditText
  input_paymentamount: '//android.widget.EditText[@content-desc="Сумма платежа"]', //android.widget.RelativeLayout//android.widget.EditText[@class="android.widget.EditText"]

  dropdownPrefix(prefix = "HE") {
    return `//android.widget.EditText[@text="${prefix}"]`;
  },
  selectPrefix(prefix) {
    return `//android.widget.TextView[@text="${prefix}"]` //[${prefix}]`;
  },
  input_login: '//android.widget.EditText[@content-desc="Логин"]',
};