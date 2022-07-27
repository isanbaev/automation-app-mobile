const { devicesUDID } = require("../configs/udids");
const { config, defaultCapabilities } = require("./general");

const devicesInitialPorts = {
  systemPort: 8200,
  mjpegServerPort: 7810,
  chromedriverPort: 9000,
};

const capabilities = devicesUDID.devicesArray.map((deviceUDID, index) => {
  return {
    ...defaultCapabilities,
    udid: deviceUDID,

    maxInstances: 1,

    systemPort: devicesInitialPorts.systemPort + index,
    mjpegServerPort: devicesInitialPorts.mjpegServerPort + index,
    chromedriverPort: devicesInitialPorts.chromedriverPort + index,
  };
});

exports.config = {
  ...config,
  capabilities,
};
