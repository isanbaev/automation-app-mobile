const allure = require("allure-commandline");

exports.config = {
  runner: "local",
  port: 4723,
  host: "localhost",
  path: "/wd/hub",
  loglevel: "info",
  maxInstances: 1,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 600000,
  },
  sync: true,
  specs: [
    // "./test/specs/custom.test.js",
    // "./test/specs/deeplinks.test.js",
    "./test/specs/dummy.test.js",
    "./test/specs/dummy2.test.js",
  ],

  reporters: [
    "dot",
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        addConsoleLogs: true
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

  capabilities: [
    {
      platformName: "Android",
      automationName: "UIAutomator2",
      udid: "",
      app: "",
      appActivity: "",
      appPackage: "",

      ignoreHiddenApiPolicyError: true,
      noReset: true,

      autoGrantPermissions: true,

      ignoreUnimportantViews: true,
      disableAndroidWatchers: true,
      disableWindowAnimation: true,
      waitForIdleTimeout: 0,
      autoLaunch: false,
    },
  ],
};
