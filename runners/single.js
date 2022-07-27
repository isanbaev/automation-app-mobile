const { devicesUDID } = require("../configs/udids");
const { config, defaultCapabilities } = require("./general");

const capabilities = [
  {
    ...defaultCapabilities,
    udid: devicesUDID.device,
  },
];

exports.config = {
  ...config,
  capabilities,
  maxInstances: 1,
};