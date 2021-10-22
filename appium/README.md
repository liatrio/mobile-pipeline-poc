
# Integration Tests using Appium 
Appium is an open source tool used to automate mobile applications. It is cross-platform allowing users to write tests against multiple platforms while using the same API allowing for code reuse. Find out more on Appium [here](https://github.com/appium/appium/blob/master/docs/en/about-appium/intro.md). 

## Local Installation

For a more intricate introduction to setting up Appium locally check out their [getting started](https://github.com/appium/appium/blob/master/docs/en/about-appium/getting-started.md) documentation. 

### Installing Appium

1. Make sure you have [Node.js and NPM](http://nodejs.org) installed. 
2. Appium should be installed after running the `yarn install` command.
3. You can run appium by running the appium NPM script: `npm run appium`

### Appium Driver Setup
1. Make sure your requirements are set up for app development using the platform you want to use Appium with. (For example Android Studio/Android SDK for Android and XCode for IOS). 
2. To automate a specific platform, an Appium "driver" is required. In the context of mobile development, an IOS and Android driver should be sufficient.
	- The [XCUITest Driver](https://appium.io/docs/en/drivers/ios-xcuitest.md) (for iOS and tvOS apps)
	- The [Espresso Driver](/docs/en/drivers/android-espresso.md) (for Android apps) 
	- The [UiAutomator2 Driver](/docs/en/drivers/android-uiautomator2.md) (for Android apps)

### Verifying Installation
1. To verify that Appium's dependencies are met run appium-doctor command. 
	- You can run appium-doctor by running the appium-doctor NPM script: `npm run appium-doctor`
	- If you encounter problems with environment variables, make sure you have them exported in your shell's startup script. To update the startup script and export in your current environment run commands similar to those below (zshrc is specific to Zsh, make sure to use the startup script specific to your shell) 
	
```
	echo "export ANDROID_HOME=/Users/home/Library/Android/sdk" >> ~/.zshrc
	source ~/.zshrc
```
## Running Appium 
### Setting up an Appium Client
1. Since Appium is just an HTTP Server, a client library is required. Appium uses the same protocol as Selenium, the Webdriver Protocol, meaning you can implement most functionality just using standard Selenium clients. 
2. Fortunately, a set of Appium Clients exists that can take advantage of Appium’s functionalities and use a variety of programming languages. You can find the list of clients [here] (https://github.com/appium/appium/blob/master/docs/en/about-appium/appium-clients.md).
3. Before running the first test make sure you have a client downloaded in your language of choice. 

### Starting Appium
1. As long as the installation process was successful, you should be able to run your Appium server directly from the command line: `appium`
	- Appium runs on the default port `4723`. You can utilize the -p flag to run Appium on a custom port.
	- Other configuration options are available by using other [server parameters](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/server-args.md)
	
## Running Example Tests on Semaphore
In this section we'll run through setting up a simple test on a Semaphore Android build.

### Prerequisites
1. For this example we'll be using the [UiAutomator2 Driver](/docs/en/drivers/android-uiautomator2.md). Run through the doc and make sure it is installed correctly.
2. We'll be using JavaScript for this example.
3. Make sure you have an Android Emulator Configured on your system. Note the version number and export an environment variable `ANDRIOID_PLATFORM_VERSION` to your shell. Do the same with your Android device name, placing it into a variable called `ANDROID_DEVICE_NAME`.
4. Make sure you have the Semaphore Test APK on your system. 
5. Create a `Appium-Example` directory with two subdirectories `helper` and `tests`

### Set up Appium Client 
For this example, we'll be using [Webdriver.io](http://webdriver.io) for our Appium Client.
