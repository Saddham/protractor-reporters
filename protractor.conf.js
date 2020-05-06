// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');
const AllureReporter = require('jasmine-allure-reporter');

var specReporter = new SpecReporter({
    // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
    spec: {
        displayStacktrace: false
    }
});

var jasmine2HtmlReporter = new Jasmine2HtmlReporter({
    savePath: './test-reports/html',
    screenshotsFolder: 'screenshots',
    takeScreenshots: true,
    takeScreenshotsOnlyOnFailures: true,
    consolidate: false,
    consolidateAll: false,
    cleanDestination: true,
    showPassed: true,
    fileName: 'test-results'

});

var jUnitXmlReporter = new JUnitXmlReporter({
    savePath: './test-reports/junit-xml',
    screenshotsFolder: 'screenshots',
    takeScreenshots: true,
    takeScreenshotsOnlyOnFailures: true,
    consolidate: false,
    consolidateAll: false,
    cleanDestination: true,
    showPassed: true,
    fileName: 'test-results'

});

var allureReporter = new AllureReporter({
    resultsDir: './test-reports/allure-xml'
});

/**
 * @type { import("protractor").Config }
 */
exports.config = {
    allScriptsTimeout: 600000,
    specs: [
        './src/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'directConnect': true,
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
        }
    },

    SELENIUM_PROMISE_MANAGER: false,

    directConnect: false,
    seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar',
    chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_81.0.4044.138',

    baseUrl: 'http://localhost:4200/',

    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 10000,
        print: function() {}
    },

    async onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.e2e.json')
        });

        jasmine.getEnv().addReporter(specReporter);
        jasmine.getEnv().addReporter(jasmine2HtmlReporter);
        jasmine.getEnv().addReporter(jUnitXmlReporter);
        jasmine.getEnv().addReporter(allureReporter);

        /**
         * @type { import("protractor").ProtractorBrowser }
         */
        const browser = global['browser'];
        browser.manage().timeouts().implicitlyWait(2000);
    }
};