import 'ts-node/register';
import Colors from './src/constants/Colors';
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  plugins: [
    'expo-router',
    [
      'expo-secure-store',
      {
        faceIDPermission: 'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
      },
    ],
    'expo-font',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        backgroundColor: Colors.light.primary,
        imageWidth: 256,
      },
    ],
    [
      'react-native-edge-to-edge',
      {
        android: {
          parentTheme: 'Light',
          enforceNavigationBarContrast: false,
        },
      },
    ],
    'expo-web-browser',
    [
      '@react-native-community/datetimepicker',
      {
        android: {
          datePicker: {
            colorAccent: {
              light: Colors.light.primary,
            },
            textColorPrimary: {
              light: Colors.light.primary,
            },
          },
          timePicker: {
            background: { light: Colors.light.primary, dark: Colors.light.primary },
            numbersBackgroundColor: { light: Colors.light.primary, dark: Colors.light.primary },
          },
        },
      },
    ],
  ],
  scheme: 'skin-first',
  name: 'Skin First',
  slug: 'skin-first',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.stelmakhivan.skinfirst',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: Colors.light.primary,
    },
    package: 'com.stelmakhivan.skinfirst',
    edgeToEdgeEnabled: true,
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
    router: {
      origin: false,
    },
    eas: {
      projectId: 'ec48248d-130e-4508-8556-db27b9d559fd',
    },
  },
  updates: {
    url: 'https://u.expo.dev/ec48248d-130e-4508-8556-db27b9d559fd',
  },
  runtimeVersion: '1.0.0',
  newArchEnabled: true,
};

export default config;
