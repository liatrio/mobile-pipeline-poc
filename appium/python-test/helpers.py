import os
import sys
from selenium.common.exceptions import InvalidSessionIdException
from datetime import datetime
from sauceclient import SauceClient

app_url = os.getenv('GITHUB_REPOSITORY') + "/actions/artifacts/" + os.getenv('IOS_ARTIFACT_URL')

IOS_BASE_CAPS = {
    # 'app': '/Users/runner/work/mobile-pipeline-poc/mobile-pipeline-poc/ReactNativeSemaphoreNew.xcarchive/Products/Applications/ReactNativeSemaphoreNew.app',
    'app': app_url,
    'automationName': 'xcuitest',
    'platformName': 'iOS',
    'platformVersion': '15.0',
    'deviceName': 'iPhone 11',
    'showXcodeLog': 'true',
    'newCommandTimeout': '120',
    # 'showIOSLog': False,
}

if os.getenv('SAUCE_LABS') and os.getenv('SAUCE_USERNAME') and os.getenv('SAUCE_ACCESS_KEY'):
    build_id = os.getenv('TRAVIS_BUILD_ID') or datetime.now().strftime('%B %d, %Y %H:%M:%S')
    build_name = 'Python Sample Code %s' % build_id

    # ANDROID_BASE_CAPS['build'] = build_name
    # ANDROID_BASE_CAPS['tags'] = ['e2e', 'appium', 'sample-code', 'android', 'python']
    # ANDROID_BASE_CAPS['app'] = 'http://appium.github.io/appium/assets/ApiDemos-debug.apk'

    IOS_BASE_CAPS['build'] = build_name
    IOS_BASE_CAPS['tags'] = ['e2e', 'appium', 'sample-code', 'ios', 'python']
    # IOS_BASE_CAPS['app'] = ''

    EXECUTOR = 'http://{}:{}@ondemand.saucelabs.com:80/wd/hub'.format(
        os.getenv('SAUCE_USERNAME'), os.getenv('SAUCE_ACCESS_KEY'))

    sauce = SauceClient(os.getenv('SAUCE_USERNAME'), os.getenv('SAUCE_ACCESS_KEY'))
else:
    EXECUTOR = 'http://127.0.0.1:4723/wd/hub'

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def report_to_sauce(session_id):
    print("Link to your job: https://saucelabs.com/jobs/%s" % session_id)
    passed = str(sys.exc_info() == (None, None, None))
    sauce.jobs.update_job(session_id, passed=passed)
