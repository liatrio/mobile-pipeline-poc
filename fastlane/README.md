fastlane documentation
================
# *fastlane* Setup

Make sure you have the latest version of the Xcode command line tools installed:
```
xcode-select --install
```

*fastlane* can be installed multiple ways. The preferred method is with *[Bundler](https://bundler.io/)*. *fastlane* can also be installed directly through with Homebrew (if on macOS). It is possible to use macOS's system Ruby but it's not recommended as it can be hard to manage dependencies and cause conflicts.

### Managed Ruby environment + Bundler (macOS/Linux/Windows)

### Ruby Setup

If you use macOS, system Ruby is not recommended. [There is a variety of ways to install Ruby without having to modify your system environment](https://www.ruby-lang.org/en/documentation/installation/#managers). For macOS and Linux, rbenv is one of the most popular ways to manage your Ruby environment.

*fastlane* supports Ruby versions 2.5 or newer. Verify which Ruby version you're using:

```
$ ruby --version
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-darwin19]
```

Install rbenv (macOS)
```
brew install rbenv
```

Make sure to install a Ruby version that is 2.5 or newer
```
rbenv install 2.6.8
```

Setup rbenv in your shell
```
rbenv init
```

### Bundler Setup

It is recommended that you use *Bundler* and `Gemfile` to define your dependency on fastlane. This will clearly define the fastlane version to be used and its dependencies, and will also speed up fastlane execution.

- Install *Bundler* by running `gem install bundler`
- Create a ./Gemfile in the root director of your project with the content
```
source "https://rubygems.org"

gem "fastlane"
```


# Installation

Make sure you have the latest version of the Xcode command line tools installed:
```
xcode-select --install
```

*fastlane* can be installed multiple ways. The preferred method is with *[Bundler](https://bundler.io/)*. *fastlane* can also be installed directly through with Homebrew (if on macOS). It is possible to use macOS's system Ruby but it's not recommended as it can be hard to manage dependencies and cause conflicts.

### Managed Ruby environment + Bundler (macOS/Linux/Windows)

### Ruby

If you use macOS, system Ruby is not recommended. [There is a variety of ways to install Ruby without having to modify your system environment](https://www.ruby-lang.org/en/documentation/installation/#managers). For macOS and Linux, rbenv is one of the most popular ways to manage your Ruby environment.

*fastlane* supports Ruby versions 2.5 or newer. Verify which Ruby version you're using:

```
$ ruby --version
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-darwin19]
```

### Bundler

It is recommended that you use *Bundler* and Gemfile to define your dependency on *fastlane*. This will clearly define the *fastlane* version to be used and its dependencies, and will also speed up fastlane *execution*.

- Install *Bundler* by running `gem install bundler`
- Create a ./Gemfile in the root director of your project with the content

```
source "https://rubygems.org"

gem "fastlane"
```
- Run `bundle update` and add both the ./Gemfile and the ./Gemfile.lock to version control
- To update *fastlane*, just run `bundle update fastlane`

### Homebrew (macOS)

This way you don't have to install Ruby separately and instead homebrew installs the most adequate Ruby version for *fastlane*.

```
brew install fastlane
```

### System Ruby + RubyGems (macOS/Linux/Windows)

This is not recommended for your local environment, but you can still install *fastlane* to system Ruby's environment. Using `sudo` often occurs unwanted results later due to file permission and makes managing your environment harder.

```
sudo gem install fastlane
```

### Setting up *fastlane*

Navigate your terminal to your project's directory and run 

```
fastlane init
```

You'll be asked to confirm that y

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios release
```
fastlane ios release
```
Release to iOS Store

----

## Android
### android release
```
fastlane android release
```
Release to Google Play Store

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
