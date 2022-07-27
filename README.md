Setting the environment:

  1. install nodeJS;
  2. install Android SDK;
  3. install Appium;
  4. write the environment variables and the path to them (ANDROID_HOME, JAVA_HOME, NODE_HOME);
  5. run `npm install` command;
  
Project structure:

  - configs - configuration files;
    - accounts.js - accounts that are used for authorization in applications;
    - paths.js - contains paths that are used throughout the project;
    - testdata.js - data used for tests;
    - udids.js - contains the udids of the devices that are used throughout the project, here specify which devices will participate in run;
    - wdio.conf.js - config for development and tests;
  - runners
    - general - the main runner from which the general settings are inherited;
    - parallel - the runner that is responsible for running parallel tests;
    - single - the runner that is responsible for running tests on a single device;
  - scenarios - sets of files that will participate in run;
  - test
    - locators - files containing element locators;
    - pages - files that contain methods and properties for interacting with the application;
    - specs - files that contain tests;
  - utils
    - builds - application builds;
    - images - various images used for testing;
    - api-interaction.js - methods and properties for interacting with the api;
    - browser-interaction.js - methods for opening files in a browser on a local machine;

Run tests:

  - `npm run config-dev` - running developer configuration;
  - `npm run test` - running test scenario;
  - `npm run all-s` - running all scenarios on 1 device;
  - `npm run all-p` - running all scenarios on multiple devices;
