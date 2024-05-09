import 'ts-node/register';
import Colors from './src/constants/Colors';
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  plugins: [
    'expo-router',
    // [
    //   'expo-font',
    //   {
    //     fonts: [
    //       'node_modules/@expo-google-fonts/league-spartan/LeagueSpartan_100Thin.ttf',
    //       'node_modules/@expo-google-fonts/league-spartan/LeagueSpartan_300Light.ttf',
    //       'node_modules/@expo-google-fonts/league-spartan/LeagueSpartan_400Regular.ttf',
    //       'node_modules/@expo-google-fonts/league-spartan/LeagueSpartan_500Medium.ttf',
    //       'node_modules/@expo-google-fonts/league-spartan/LeagueSpartan_600SemiBold.ttf',
    //     ],
    //   },
    // ],
  ],
  scheme: 'skin-first',
  name: 'Skin First',
  slug: 'skin-first',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: Colors.light.primary,
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.stelmakhivan.skinfirst',
    privacyManifests: {
      NSPrivacyAccessedAPITypes: [
        {
          NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryFileTimestamp',
          NSPrivacyAccessedAPITypeReasons: ['C617.1'],
        },
        {
          NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategorySystemBootTime',
          NSPrivacyAccessedAPITypeReasons: ['35F9.1'],
        },
        {
          NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryDiskSpace',
          NSPrivacyAccessedAPITypeReasons: ['E174.1'],
        },
        {
          NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryUserDefaults',
          NSPrivacyAccessedAPITypeReasons: ['CA92.1'],
        },
      ],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: Colors.light.primary,
    },
    package: 'com.stelmakhivan.skinfirst',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'ec48248d-130e-4508-8556-db27b9d559fd',
    },
  },
  updates: {
    url: 'https://u.expo.dev/ec48248d-130e-4508-8556-db27b9d559fd',
  },
  runtimeVersion: '1.0.0',
};

export default config;
