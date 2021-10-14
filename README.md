
# Demo Mobile CI/CD pipeline using React Native

Example application and CI/CD pipeline showing how to run a React Native project
using GitHub Actions. 

This repository was forked and edited from a Semaphore demo application linked [here](https://github.com/semaphoreci-demos/semaphore-demo-react-native).

### Installation

```bash
$ yarn install
```

##### IOS

If you haven't used Cocoapods before you'll also need to install Cocoapods
```bash
$ sudo gem install cocoapods 
```

```bash
$ cd ios
$ pod install
```

##### Android

Make sure your `JAVA_HOME`, `ANDROID_HOME`, and `ANDROID_SDK_ROOT` environment variables are all setup.
```bash
export JAVA_home=".../openjdk"
export ANDROID_HOME=".../Android/sdk"
export ANDROID_SDK_root=".../Android/sdk"
```

You might have to install `android-platform-tools`.
```bash
$ brew install android-platform-tools
```

### Running the app

```bash
$ npm start
```

If you want to run the app in a phone simulator you will run one of these commands:
##### IOS
```bash
$ npm run ios
```

##### Android
```bash
$ npm run android
```

### Lint

```bash
$ npm run lint
```

### Unit and integration tests

```bash
$ npm test
```

### e2e UI tests iOS

```bash
$ npm run detox-ios-build
$ npm run detox-ios-test
```

### e2e UI tests android

```bash
$ npm run detox-android-build
$ npm run detox-android-test
```

## Troubleshooting

If while runing your end to end tests on iOS you get this error `#error Unsupported architecture` make sure that the detox configuration uses the `ONLY_ACTIVE_ARCH=YES` flag as shown in the [package.json](./package.json) file.

## License

Copyright (c) 2019 Rendered Text

Distributed under the MIT License. See the file [LICENSE.md](./LICENSE.md).
