module.exports = {
  // service page
  tab_services: "id=uz.dida.payme:id/servicespage",

  // MIB page
  btn_mib: '//android.widget.TextView[contains(@text, "MIB")]',
  btn_mibcheck: "id=uz.dida.payme:id/fragment_check_mib_btn",

  btn_mibscandoc: "id=uz.dida.payme:id/fragment_add_passport_scan_btn",
  btn_mibupload: "id=uz.dida.payme:id/choose_id_load",

  // selectImage: (image) => { //redmi9
  //   return `//*[contains(@content-desc, "${image}")]`;
  // },
  selectImage: function (image) { //samsungS9
    return `//*[contains(@text, "${image}")]`;
  },

  toast_mib: "/hierarchy/android.widget.Toast",

  input_mibseries: "id=uz.dida.payme:id/fragment_add_passport_series_et",
  input_mibnumber: "id=uz.dida.payme:id/fragment_add_passport_number_et",
};
