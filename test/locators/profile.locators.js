module.exports = {
  // profile
  btn_deleteprofile: "id=uz.dida.payme:id/delete",

  input_password: "id=uz.dida.payme:id/editTextPassword",
  
  btn_cancel: "id=uz.dida.payme:id/btnCancel",
  btn_done: "id=uz.dida.payme:id/btnDone",

  btn_changeprofile: "id=uz.dida.payme:id/btnLogOut",
  scrollToElement: (id) => {
    let uiselectorscroll = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("${id}"))`;
    return `android=${uiselectorscroll}`;
  },
  btn_confirm: "id=android:id/button1",
  btn_cancel: "id=android:id/button2",
};