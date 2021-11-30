#!/usr/bin/env bash
yarn install

cd ios && gem install cocoapods && pod install

