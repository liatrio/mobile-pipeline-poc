const wdio = require("webdriverio");
const assert = require('chai').assert;

const opts = {
	path: '/wd/hub',
	port: 4723,
	capabilities: {
		platformName: "Android",
		platformVersion: "8.1",
		deviceName: "Android Emulator",
		app: "app-release.apk",
		appPackage: "com.reactnativesemaphorenew",
		automationName: "UiAutomator2",
		avd: "test",
		uiautomator2ServerInstallTimeout: "1000000",
		newCommandTimeout: "240",
		androidDeviceReadyTimeout: "240",
		avdLaunchTimeout: "300000",
		avdReadyTimeout: "300000"

	}

};

describe('Mobile App POC Appium Tests', function () {
	let client;

	beforeEach(async function () {
		console.log("Before Each-----------------------------")
		this.timeout(500000);
		client = await wdio.remote(opts);
		client.setImplicitTimeout(500000);
		client.background(200);
	});

	afterEach(async function () {
		console.log("After Each-----------------------------")
		this.timeout(500000);
		const delete_session = await client.deleteSession();
		assert.isNull(delete_session);
	});

	it('should create and delete a session', async function () {
		console.log("Test-----------------------------")
		this.timeout(500000);
		const res = await client.status();
		assert.isObject(res.build);
		client.setImplicitTimeout(500000);
		
		const current_package = await client.getCurrentPackage();
		assert.equal(current_package, 'com.reactnativesemaphorenew');
	});

	// it('should find the home page text `Welcome to React Native`', async function () {
	// 	this.timeout(500000);
	// 	client.setImplicitTimeout(100000);

	// 	const element = await client.findElement('xpath', '//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[2]');

	// 	await client.getElementAttribute(element.ELEMENT, 'text').then((attr) => {
	// 		assert.equal(attr, 'Welcome to\nReact Native');
	// 	});
	// });

	// it('should find the toggle element and toggle it', async function () {
	// 	this.timeout(200000);
	// 	client.setImplicitTimeout(100000);

	// 	const element = await client.findElement('class name', 'android.widget.Switch'); // await client.$("class name:android.widget.Switch");

	// 	await client.getElementAttribute(element.ELEMENT, 'text').then((attr) => {
	// 		assert.equal(attr, 'OFF');
	// 	 });
	// 	await client.elementClick(element.ELEMENT);
	// 	await client.getElementAttribute(element.ELEMENT, 'text').then((attr) => {
	// 	  assert.equal(attr, 'ON');
	// 	});
	// });

  });
