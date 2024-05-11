import { useAuth } from '@/services';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Redirect, Stack } from 'expo-router';
import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { AuthHeader } from '@/components';
import { useThemeColor, useWarmUpBrowser } from '@/hooks';

if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const LoginHeader = (props: NativeStackHeaderProps) => (
  <AuthHeader {...props} headerTitle="Log In" />
);

const SignUpHeader = (props: NativeStackHeaderProps) => (
  <AuthHeader {...props} headerTitle="New Account" />
);

const AuthLayout = () => {
  useWarmUpBrowser();

  const { isSignedIn } = useAuth();

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

  if (isSignedIn) {
    return <Redirect href={'/(home)'} />;
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          header: LoginHeader,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          header: SignUpHeader,
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  stackTitle: {
    fontFamily: 'ls-semibold',
    fontSize: 24,
  },
});

export default AuthLayout;
