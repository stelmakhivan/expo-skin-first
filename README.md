# Skin First Mobile and Web App

### [Link to Figma design](<https://www.figma.com/file/uujDxnD7XOwBdYPZzrn7St/Medical-Health-Mobile-App%3A-Dermatology-App-Ui-Kit-(Community)?type=design&node-id=37-626&mode=design>)

## Setup project

```shell
yarn install
bundle install
cd ios && bundle exec pod install && cd ..
yarn ios
yarn android
yarn web
```

## Tested with environment

`npx react-native info`

```shell
System:
  OS: macOS 15.2
  CPU: (10) arm64 Apple M1 Max
  Memory: 4.43 GB / 32.00 GB
  Shell:
    version: "5.9"
    path: /bin/zsh
Binaries:
  Node:
    version: 22.14.0
    path: ~/.nvm/versions/node/v22.14.0/bin/node
  Yarn:
    version: 1.22.19
    path: ~/.nvm/versions/node/v22.14.0/bin/yarn
  npm:
    version: 10.9.2
    path: ~/.nvm/versions/node/v22.14.0/bin/npm
  Watchman:
    version: 2023.10.23.00
    path: /opt/homebrew/bin/watchman
Managers:
  CocoaPods:
    version: 1.14.2
    path: /Users/ivanstelmakh/.rvm/gems/ruby-3.2.2/bin/pod
SDKs:
  iOS SDK:
    Platforms:
      - DriverKit 24.2
      - iOS 18.2
      - macOS 15.2
      - tvOS 18.2
      - visionOS 2.2
      - watchOS 11.2
  Android SDK: Not Found
IDEs:
  Android Studio: 2024.2 AI-242.23726.103.2422.13016713
  Xcode:
    version: 16.2/16C5032a
    path: /usr/bin/xcodebuild
Languages:
  Java:
    version: 17.0.9
    path: /usr/bin/javac
  Ruby:
    version: 3.2.2
    path: /Users/ivanstelmakh/.rvm/rubies/ruby-3.2.2/bin/ruby
npmPackages:
  "@react-native-community/cli":
    installed: 15.1.2
    wanted: latest
  react:
    installed: 18.3.1
    wanted: 18.3.1
  react-native:
    installed: 0.76.7
    wanted: 0.76.7
  react-native-macos: Not Found
npmGlobalPackages:
  "*react-native*": Not Found
Android:
  hermesEnabled: true
  newArchEnabled: false
iOS:
  hermesEnabled: true
  newArchEnabled: false
```

### NOTES

- New Architecture is disabled because of the issue with the `react-native-text-input-mask` library.
  It's not compatible with the new architecture yet.
