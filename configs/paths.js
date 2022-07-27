const path = require("path");

exports.paths = {
  apps: {
    prod: path.join(__dirname, "..", "/utils/builds", "apk name"),
    dev: null,
  },
  images: {
    image_qr: path.join(__dirname, "..", "/utils/images", "some image name"),
    image_card: path.join(__dirname, "..", "/utils/images", "some image name"),
  },

  baseurl: "base url", 
};
