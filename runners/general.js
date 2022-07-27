const { paths } = require("../configs/paths");
const allure = require("allure-commandline");

exports.defaultCapabilities = {
  platformName: "Android",
  automationName: "UIAutomator2",
  udid: null,
  app: paths.apps.prod,
  appActivity: "app Activity",
  appPackage: "app Package",

  ignoreHiddenApiPolicyError: true,
  noReset: true,

  autoGrantPermissions: true,

  ignoreUnimportantViews: true,
  disableAndroidWatchers: true,
  disableWindowAnimation: true,
  waitForIdleTimeout: 0,
  autoLaunch: false,
};

exports.config = {
  runner: "local",
  port: 4723,
  host: "localhost",
  path: "/wd/hub",
  loglevel: "info",
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 600000,
    retries: 2,
  },
  sync: true,
  specs: [],

  reporters: [
    "dot",
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
      },
    ],
  ],

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },

  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const generation = allure(["generate", "allure-results", "--clean"]);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);

      generation.on("exit", function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log("Allure report successfully generated");
        resolve();
      });
    });
  },

  capabilities: [],
};
