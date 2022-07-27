exports.devicesUDID = {
  first: "first udid",
  second: "second udid",
  third: "third udid",

  get device() {
    return this.second;
  },

  get devicesArray() {
    return [this.first, this.second, this.third];
  },
};