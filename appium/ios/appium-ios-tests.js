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
		// app: "/Users/runner/work/mobile-pipeline-poc/mobile-pipeline-poc/ReactNativeSemaphoreNew.xcarchive/Products/Applications/ReactNativeSemaphoreNew.app",
        // local
		app: "/Users/ssmathistad/oct27mpoc/mobile-pipeline-poc/ReactNativeSemaphoreNew.xcarchive/Products/Applications/ReactNativeSemaphoreNew.app",
		showXcodeLog: "true",
		newCommandTimeout: "60"
	}
};

describe('Mobile App POC Appium Tests', function () {
	let client;

	beforeEach(async function () {
		this.timeout(500000);
		client = await wdio.remote(opts);
		//client.setImplicitTimeout(500000);
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
		//client.setImplicitTimeout(500000);
	});

	it('should find the home page text `Step One`', async function () {
		this.timeout(500000);
		//client.setImplicitTimeout(100000);

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

	it('should find the search button, click it, and verify the search text `Select Country`', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(element.ELEMENT);

		const search_screen_element = await client.findElement('accessibility id', 'Select Country');

		await client.getElementAttribute(search_screen_element.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});
	});

	it('should find the search button, click it, and return to the home page', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(element.ELEMENT);

		const search_screen_element = await client.findElement('accessibility id', 'header-back');
		await client.elementClick(search_screen_element.ELEMENT);

		const home_screen_element = await client.findElement('accessibility id', 'Step One');
		await client.getElementAttribute(home_screen_element.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});
	});

	it('should find the search button, click it, and find 5 countries listed', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(element.ELEMENT);

		const list_Item_Afghanistan = await client.findElement('accessibility id', 'listItem-Afghanistan');
		await client.getElementAttribute(list_Item_Afghanistan.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});

		const list_Item_Albania = await client.findElement('accessibility id', 'listItem-Albania');
		await client.getElementAttribute(list_Item_Albania.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});

		const list_Item_Algeria = await client.findElement('accessibility id', 'listItem-Algeria');
		await client.getElementAttribute(list_Item_Algeria.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});

		const list_Item_American_Samoa = await client.findElement('accessibility id', 'listItem-American Samoa');
		await client.getElementAttribute(list_Item_American_Samoa.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});

		const list_Item_Andorra = await client.findElement('accessibility id', 'listItem-Andorra');
		await client.getElementAttribute(list_Item_Andorra.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});

	});

});


