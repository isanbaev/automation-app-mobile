const {config: parallelRuner} = require('../runners/parallel');

exports.config = {
  ...parallelRuner,
  specs: [
    "./test/specs/authorization.test.js",
    "./test/specs/autosuggestions.test.js",
    "./test/specs/custom.test.js",
    "./test/specs/deeplinks.test.js",
  ]
};