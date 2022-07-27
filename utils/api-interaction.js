const axios = require("axios");
const baseurl = require("../configs/paths").paths.baseurl;

class sendRequests {
  constructor(phone, amount, merchantid) {
    this.phone = phone;
    this.amount = amount;
    this.merchantid = merchantid;
  }

  async getMobileCheckId() {
    try {
      const resp = await axios.post(baseurl + "/api/cheque.create", {
        "method": "cheque.create",
        "params": {
          "account": {
            "phone": `${this.phone}`,
          },
          "amount": this.amount,
          "merchant_id": this.merchantid,
        },
      });

      return resp.data.result.cheque._id;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = sendRequests;
