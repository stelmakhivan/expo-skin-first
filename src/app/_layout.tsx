import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import {
  useFonts,
  LeagueSpartan_100Thin,
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
  LeagueSpartan_500Medium,
  LeagueSpartan_600SemiBold,
} from '@expo-google-fonts/league-spartan';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useNavigationContainerRef } from 'expo-router';
import Head from 'expo-router/head';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { AuthProvider, useAuth, tokenCache } from '@/services';
import { GestureHandlerView } from '@/components';

import '../../global.css';
import { Platform } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

const AUTH_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_AUTH_PUBLISHABLE_KEY;

const FONTS_MAP = {
  'ls-thin': LeagueSpartan_100Thin,
  'ls-light': LeagueSpartan_300Light,
  'ls-regular': LeagueSpartan_400Regular,
  'ls-medium': LeagueSpartan_500Medium,
  'ls-semibold': LeagueSpartan_600SemiBold,
};

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);

  return (
    <AuthProvider publishableKey={AUTH_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded: isAuthLoaded } = useAuth();
  const { colorScheme } = useColorScheme();

  const [isFontsLoaded, error] = useFonts(FONTS_MAP);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (isAuthLoaded && isFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isAuthLoaded, isFontsLoaded]);

  if (!(isAuthLoaded && isFontsLoaded)) {
    return null;
  }

  return (
    <GestureHandlerView>
      {Platform.OS === 'web' && (
        <Head>
          <title>Skin First Dermatology Center</title>
        </Head>
      )}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </GestureHandlerView>
  );
}
