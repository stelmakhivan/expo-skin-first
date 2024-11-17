# Skin First Mobile and Web App

### [Link to Figma design](<https://www.figma.com/file/uujDxnD7XOwBdYPZzrn7St/Medical-Health-Mobile-App%3A-Dermatology-App-Ui-Kit-(Community)?type=design&node-id=37-626&mode=design>)

## Setup project

```shell
yarn install
cd ios && pod install && cd ..
yarn ios
yarn android
yarn web
```

## Tested with environment

`npx react-native info`

```shell
System:
  OS: macOS 15.1
  CPU: (10) arm64 Apple M1 Max
  Memory: 5.18 GB / 32.00 GB
  Shell:
    version: "5.9"
    path: /bin/zsh
Binaries:
  Node:
    version: 20.10.0
    path: ~/.nvm/versions/node/v20.10.0/bin/node
  Yarn:
    version: 1.22.19
    path: ~/.nvm/versions/node/v20.10.0/bin/yarn
  npm:
    version: 10.2.3
    path: ~/.nvm/versions/node/v20.10.0/bin/npm
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
      - DriverKit 24.1
      - iOS 18.1
      - macOS 15.1
      - tvOS 18.1
      - visionOS 2.1
      - watchOS 11.1
  Android SDK: Not Found
IDEs:
  Android Studio: 2024.2 AI-242.23339.11.2421.12550806
  Xcode:
    version: 16.1/16B40
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
    installed: 0.76.2
    wanted: 0.76.2
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
