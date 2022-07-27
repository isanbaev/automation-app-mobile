const {config: singleRunner} = require('../runners/single');

exports.config = {
  ...singleRunner,
  specs: [
    "./test/specs/authorization.test.js",
    "./test/specs/autosuggestions.test.js",
    "./test/specs/custom.test.js",
    "./test/specs/deeplinks.test.js",
  ]
};