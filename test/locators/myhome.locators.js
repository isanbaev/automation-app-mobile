module.exports = {
  selectSavedPayment(merch) {
    return `//android.widget.TextView[matches(@text, "${merch}", "i")]`;
  },
  btn_amount: "id=uz.dida.payme:id/etAmount",
  btns_hints: "//androidx.cardview.widget.CardView",
  selectHint(hintnumber) {
    return `//androidx.cardview.widget.CardView[${hintnumber}]`
  },
  input_amount: "id=uz.dida.payme:id/editTextInput",
  btn_next: "id=uz.dida.payme:id/btnNext",
};