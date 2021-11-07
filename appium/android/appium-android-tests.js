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
		///platformVersion: "10",
		
		deviceName: "Android Emulator",
		
		app: "/Users/runner/work/mobile-pipeline-poc/mobile-pipeline-poc/app-release.apk",
		// local
		//app: "/Users/ssmathistad/oct27mpoc/mobile-pipeline-poc/app-release.apk",
		
		appPackage: "com.reactnativesemaphorenew",
		automationName: "UiAutomator2",

		//systemPort: "8210",
		
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

		// Find the home page text 'Step One'
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

		// Click the search button
		const element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(30000);

		// Find the text 'Search Countries'
		const search_screen_element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.EditText');
		await client.getElementAttribute(search_screen_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'Search Countries');
		});
	});

	it('should find the search button, click it, and return to the home page', async function () {
		this.timeout(500000);
		client.setImplicitTimeout(100000);

		// Find the home page text 'Step One'
		const text_element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[1]');
		await client.getElementAttribute(text_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'Step One');
		});

		// Click the search button
		const element = await client.findElement('xpath', '//android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		client.setImplicitTimeout(300000);
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(300000);

		// Click on the back arrow
		//const search_screen_element = await client.findElement('class name', 'android.widget.ImageView');
		const search_screen_element = await client.findElement('xpath', '//android.widget.Button[@content-desc="Home, back"]/android.widget.ImageView');
		client.setImplicitTimeout(300000);
		await client.elementClick(search_screen_element.ELEMENT);
		client.setImplicitTimeout(300000);

		// // Find the home page toggle
		const element_on_return = await client.findElement('class name', 'android.widget.Switch');
		// const element_on_return = await client.findElement('xpath', '//android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.Switch');
		await client.getElementAttribute(element_on_return.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'OFF');
		});
	});

	it('should find the search button, click it, and find the first 3 countries listed', async function () {
		this.timeout(500000);
		this.retries(3)
		client.setImplicitTimeout(100000);

		// Find the home page text 'Step One'
		const text_element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[1]');
		await client.getElementAttribute(text_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'Step One');
		});

		// Click the search button
		const element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		client.setImplicitTimeout(300000);
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(300000);

		const list_Item_Afghanistan = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView[2]');
		await client.getElementAttribute(list_Item_Afghanistan.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, '(93) Afghanistan');
		});

		const list_Item_Albania = await client.findElement('xpath', '//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.TextView[2]');
		await client.getElementAttribute(list_Item_Albania.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, '(355) Albania');
		});

		const list_Item_Algeria = await client.findElement('xpath', '//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.widget.TextView[2]');
		await client.getElementAttribute(list_Item_Algeria.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, '(213) Algeria');
		});

		client.setImplicitTimeout(300000);

		// const list_Item_American_Samoa = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.widget.TextView[2]');
		// await client.getElementAttribute(list_Item_American_Samoa.ELEMENT, 'text').then((attr) => {
		// 	assert.equal(attr, '(1684) American Samoa');
		// });

		// const list_Item_Andorra = await client.findElement('xpath', '//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[5]/android.view.ViewGroup/android.widget.TextView[2]');
		// await client.getElementAttribute(list_Item_Andorra.ELEMENT, 'text').then((attr) => {
		// 	assert.equal(attr, '(376) Andorra');
		// });
	});

	it('should find the search button, click it, enter `United States`, and verify the search box value as `United States`', async function () {
		this.timeout(500000);
		this.retries(3)
		client.setImplicitTimeout(100000);

		// Find the home page text 'Step One'
		const text_element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[1]');
		await client.getElementAttribute(text_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'Step One');
		});

		// Click the search button
		const element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		client.setImplicitTimeout(300000);
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(300000);

		// Enter text into the search box
		const search_screen_element = await client.findElement('class name', 'android.widget.EditText');
		client.setImplicitTimeout(300000);
		await client.elementClick(search_screen_element.ELEMENT);
		client.setImplicitTimeout(300000);
		await client.elementSendKeys(search_screen_element.ELEMENT, 'United States');
		client.setImplicitTimeout(300000);
		await client.getElementAttribute(search_screen_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'United States');
		});
		client.setImplicitTimeout(300000);

		// Verify the search result `United States`
		const list_Item_United_States = await client.findElement('xpath', '//android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]');
		await client.getElementAttribute(list_Item_United_States.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, '(1) United States');
		});
	});

	it('should find the search bar after attempting to search again', async function () {
		this.timeout(500000);
		this.retries(3)
		client.setImplicitTimeout(100000);

		// Find the home page text 'Step One'
		const text_element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[1]');
		await client.getElementAttribute(text_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'Step One');
		});

		// Click the search button
		const element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		client.setImplicitTimeout(300000);
		await client.elementClick(element.ELEMENT);
		client.setImplicitTimeout(300000);

		// Enter text into the search box
		const search_screen_element = await client.findElement('class name', 'android.widget.EditText');
		client.setImplicitTimeout(300000);
		await client.elementClick(search_screen_element.ELEMENT);
		client.setImplicitTimeout(300000);
		await client.elementSendKeys(search_screen_element.ELEMENT, 'United States');
		client.setImplicitTimeout(300000);
		await client.getElementAttribute(search_screen_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, 'United States');
		});

		// Verify the search result `United States`
		const list_Item_United_States = await client.findElement('xpath', '//android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]');
		await client.getElementAttribute(list_Item_United_States.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, '(1) United States');
		});

		// Extension

		// Click on the back arrow
		//const search_screen_element = await client.findElement('class name', 'android.widget.ImageView');
		const back_arrow_element = await client.findElement('xpath', '//android.widget.Button[@content-desc="Home, back"]/android.widget.ImageView');
		client.setImplicitTimeout(300000);
		await client.elementClick(back_arrow_element.ELEMENT);
		client.setImplicitTimeout(300000);

		// Click the search button
		const search_button_element = await client.findElement('xpath', '//android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup');
		client.setImplicitTimeout(300000);
		await client.elementClick(search_button_element.ELEMENT);
		client.setImplicitTimeout(300000);

		// Verfify the text box exists
		const search_box_element = await client.findElement('class name', 'android.widget.EditText');
		await client.getElementAttribute(search_box_element.ELEMENT, 'text').then((attr) => {
			assert.equal(attr, '(1) United States');
		});
	// 	const search_screen_on_return_element = await client.findElement('accessibility id', 'countriesAutocompleteInput');
	// 	await client.getElementAttribute(search_screen_on_return_element.ELEMENT, 'visible').then((attr) => {
	// 		assert.equal(attr, 'true');
	// 	});
	});

});
