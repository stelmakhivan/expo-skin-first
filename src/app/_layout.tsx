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
import { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthHeader } from '@/components';
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
  const primaryColor = useThemeColor({}, 'primary');

  const screenOptions = useMemo(
    () => ({
      contentStyle: { backgroundColor },
      headerTitleStyle: [styles.stackTitle, { color: primaryColor }],
      headerShadowVisible: false,
    }),
    [primaryColor, backgroundColor],
  );

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/login"
            options={{
              header: (props) => <AuthHeader {...props} headerTitle="Log In" />,
            }}
          />
          <Stack.Screen
            name="(auth)/sign-up"
            options={{
              header: (props) => <AuthHeader {...props} headerTitle="New Account" />,
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  stackTitle: {
    fontFamily: 'ls-semibold',
    fontSize: 24,
  },
});
