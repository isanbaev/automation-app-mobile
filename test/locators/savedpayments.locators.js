module.exports = {
  selectSavedPayment(merch) {
    return `//android.widget.TextView[matches(@text, "${merch}", "i")]`;
  },
};