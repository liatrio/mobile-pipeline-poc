const wdio = require("webdriverio");
const assert = require('chai').assert;

const opts = {
	path: '/wd/hub',
	port: 4723,
	connectionRetryTimeout: 900000,
	capabilities: {
		platformName: "Android",
		
		platformVersion: "8.1",
		// local
		//platformVersion: "10",
		
		deviceName: "Android Emulator",
		
		app: "/Users/runner/work/mobile-pipeline-poc/mobile-pipeline-poc/app-release.apk",
		// local
		//app: "/Users/ssmathistad/oct27mpoc/mobile-pipeline-poc/app-release.apk",
		
		appPackage: "com.reactnativesemaphorenew",
		automationName: "UiAutomator2",
		
		avd: "sdk_gphone_x86",
		
		uiautomator2ServerInstallTimeout: "4000000",
		newCommandTimeout: "2400",
		androidDeviceReadyTimeout: "2400",
		avdLaunchTimeout: "400000",
		avdReadyTimeout: "400000",
		androidInstallTimeout: "400000",
		adbExecTimeout: "400000"
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
		client.setImplicitTimeout(100000);

		const res = await client.status();
		assert.isObject(res.build);
		
		const current_package = await client.getCurrentPackage();
		assert.equal(current_package, 'com.reactnativesemaphorenew');
	});

	it('should find the home page text `Step One`', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[1]');

		await client.getElementAttribute(element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'Step One');
		});
	});

	it('should find the toggle element and toggle it', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('class name', 'android.widget.Switch');

		await client.getElementAttribute(element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'OFF');
		 });
		await client.elementClick(element.ELEMENT);
		await client.getElementAttribute(element.ELEMENT, 'text').then((attr) => {
		  assert.equal(attr, 'ON');
		});
	});

	it('should find the search button, click it, and verify the search text `Select Country`', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(30000);

		const search_screen_element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.EditText');
		await client.getElementAttribute(search_screen_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'Search Countries');
		});
	});

	

});
