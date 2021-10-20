// javascript
const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
	path: '/wd/hub',
	port: 4723,
	capabilities: {
		platformName: "Android",
		platformVersion: process.env.ANDRIOID_PLATFORM_VERSION || "11",
		deviceName: process.env.ANDROID_DEVICE_NAME || "Pixel 5 API 30",
		app: "/Users/micahperez/Desktop/mobile-pipeline-poc/android/app/build/outputs/apk/androidTest/release/app-release-androidTest.apk",
		appPackage: "com.reactnativesemaphorenew",
		appActivity: "com.reactnativesemaphorenew.MainActivity",
		automationName: "UiAutomator2"
	}
};

async function main() {
	const client = await wdio.remote(opts);
	
	await client.deleteSession();
}

main();
