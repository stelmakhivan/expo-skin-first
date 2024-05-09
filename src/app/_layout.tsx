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
import * as SplashScreen from 'expo-splash-screen';
import { NativeWindStyleSheet, useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth, tokenCache } from '@/services';

import '../../global.css';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: 'native',
});

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

  const [loaded, error] = useFonts(FONTS_MAP);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider publishableKey={AUTH_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded } = useAuth();
  const { colorScheme } = useColorScheme();

  if (!isLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
