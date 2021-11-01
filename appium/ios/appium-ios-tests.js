const wdio = require("webdriverio");
const assert = require('chai').assert;

const opts = {
	path: '/wd/hub',
	port: 4723,
	connectionRetryTimeout: 900000,
	capabilities: {
        platformName: "iOS",
        platformVersion: "15.0",
        deviceName: "iPhone 11",		
        automationName: "XCUITest",
		//app: "ReactNativeSemaphoreNew.xcarchive/Products/Applications/ReactNativeSemaphoreNew.app",
        usePrebuiltWDA: "true",
        showXcodeLog: "true",
		//app: "/Users/ssmathistad/oct27mpoc/mobile-pipeline-poc/ReactNativeSemaphoreNew_iosSim-iPhone11.xcarchive/Products/Applications/ReactNativeSemaphoreNew.app",
	    app: "/Users/ssmathistad/oct27mpoc/mobile-pipeline-poc/ReactNativeSemaphoreNew1.xcarchive/Products/Applications/ReactNativeSemaphoreNew.app",
		newCommandTimeout: "240"
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
	});

	it('should find the home page text `Step One`', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'Step One');

		await client.getElementAttribute(element.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});
	});

	it('should find the toggle element and toggle it', async function () {
		this.timeout(200000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'toggle');

		await client.getElementAttribute(element.ELEMENT, 'value').then((attr) => {
			assert.equal(attr, '0');
		 });
		await client.elementClick(element.ELEMENT);
		await client.getElementAttribute(element.ELEMENT, 'value').then((attr) => {
			assert.equal(attr, '1');
		});
	});

});
