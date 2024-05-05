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
import { Stack, useNavigationContainerRef } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { NativeWindStyleSheet, useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useThemeColor } from '@/hooks/useThemeColor';

import '../../root-styles';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);

  const [loaded, error] = useFonts({
    'ls-thin': LeagueSpartan_100Thin,
    'ls-light': LeagueSpartan_300Light,
    'ls-regular': LeagueSpartan_400Regular,
    'ls-medium': LeagueSpartan_500Medium,
    'ls-semibold': LeagueSpartan_600SemiBold,
  });

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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, contentStyle: { backgroundColor } }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
