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