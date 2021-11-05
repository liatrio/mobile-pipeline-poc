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
		newCommandTimeout: "2400",
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
		this.timeout(500000);
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
		client.setImplicitTimeout(10000);

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
	    client.setImplicitTimeout(10000);

		const search_screen_element = await client.findElement('accessibility id', 'header-back');
		await client.elementClick(search_screen_element.ELEMENT);
		client.setImplicitTimeout(10000);

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
	    client.setImplicitTimeout(10000);

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

	it('should find the search button, click it, enter `United States`, and verify the search box value as `United States`', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(10000);

		const search_screen_element = await client.findElement('accessibility id', 'countriesAutocompleteInput');
		await client.elementClick(search_screen_element.ELEMENT);
		await client.elementSendKeys(search_screen_element.ELEMENT, 'United States');
		client.setImplicitTimeout(10000);
		await client.getElementAttribute(search_screen_element.ELEMENT, 'value').then((attr) => {
			assert.equal(attr, 'United States');
		});

		const list_Item_United_States = await client.findElement('accessibility id', 'listItem-United States');
		await client.getElementAttribute(list_Item_United_States.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});
	});

	it('should find the search bar after attempting to search again', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(10000);

		const search_screen_element = await client.findElement('accessibility id', 'countriesAutocompleteInput');
		await client.elementClick(search_screen_element.ELEMENT);
		await client.elementSendKeys(search_screen_element.ELEMENT, 'United States');
		client.setImplicitTimeout(10000);
		await client.getElementAttribute(search_screen_element.ELEMENT, 'value').then((attr) => {
			assert.equal(attr, 'United States');
		});

		const list_Item_United_States = await client.findElement('accessibility id', 'listItem-United States');
		await client.getElementAttribute(list_Item_United_States.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});

		// Extension

		const back_button_element = await client.findElement('accessibility id', 'header-back');
		await client.elementClick(back_button_element.ELEMENT);
		client.setImplicitTimeout(10000);

		const search_buttom_element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(search_buttom_element.ELEMENT);
	    client.setImplicitTimeout(10000);
		
		const search_screen_on_return_element = await client.findElement('accessibility id', 'countriesAutocompleteInput');
		await client.getElementAttribute(search_screen_on_return_element.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});
	});


	it('shouldn\'t find the search bar after attempting to search again after clicking on a result', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		const element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(10000);

		const search_screen_element = await client.findElement('accessibility id', 'countriesAutocompleteInput');
		await client.elementClick(search_screen_element.ELEMENT);
		await client.elementSendKeys(search_screen_element.ELEMENT, 'United States');
		client.setImplicitTimeout(10000);
		await client.getElementAttribute(search_screen_element.ELEMENT, 'value').then((attr) => {
			assert.equal(attr, 'United States');
		});

		const list_Item_United_States = await client.findElement('accessibility id', 'listItem-United States');
		await client.getElementAttribute(list_Item_United_States.ELEMENT, 'visible').then((attr) => {
			assert.equal(attr, 'true');
		});

		// Extension

		await client.elementClick(list_Item_United_States.ELEMENT);
		client.setImplicitTimeout(10000);

		const back_button_element = await client.findElement('accessibility id', 'header-back');
		await client.elementClick(back_button_element.ELEMENT);
		client.setImplicitTimeout(10000);

		const search_buttom_element = await client.findElement('accessibility id', 'searchButton');
		await client.elementClick(search_buttom_element.ELEMENT);
	    client.setImplicitTimeout(10000);

		isPresent = "false"

		try {
			await client.findElement('accessibility id', 'countriesAutocompleteInput');
			assert.equal(isPresent, "true");
		} catch(error) {
			assert.equal(isPresent, "false");
		}
	});

});
