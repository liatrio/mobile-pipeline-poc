const wdio = require("webdriverio");
const assert = require('chai').assert;

const opts = {
	path: '/wd/hub',
	port: 4723,
	connectionRetryTimeout: 900000,
	capabilities: {
        "platformName": "iOS",
        "platformVersion": "11.0",
        "deviceName": "iPhone 7",
        "automationName": "XCUITest",
		"app": "/Users/runner/work/mobile-pipeline-poc/mobile-pipeline-poc"
		// platformName: "Android",
		// platformVersion: "8.1",
		// deviceName: "Android Emulator",
		// app: "/Users/runner/work/mobile-pipeline-poc/mobile-pipeline-poc/app-release.apk",
		// appPackage: "com.reactnativesemaphorenew",
		// automationName: "UiAutomator2",
		// avd: "sdk_gphone_x86",
		// uiautomator2ServerInstallTimeout: "4000000",
		// newCommandTimeout: "2400",
		// androidDeviceReadyTimeout: "2400",
		// avdLaunchTimeout: "400000",
		// avdReadyTimeout: "400000",
		// androidInstallTimeout: "400000",
		// adbExecTimeout: "400000"
	}

};

describe('Mobile App POC Appium Tests', function () {
	let client;

	beforeEach(async function () {
		this.timeout(500000);
		client = await wdio.remote(opts);
		client.setImplicitTimeout(500000);
	});

	afterEach(async function () {
		this.timeout(500000);
		const delete_session = await client.deleteSession();
		assert.isNull(delete_session);
	});

	it('should create and delete a session', async function () {
		this.timeout(500000);
		const res = await client.status();
		assert.isObject(res.build);
		client.setImplicitTimeout(500000);
		
		const current_package = await client.getCurrentPackage();
		assert.equal(current_package, 'com.reactnativesemaphorenew');
	});

});
