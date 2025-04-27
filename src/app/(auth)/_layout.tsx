import { useAuth } from '@/services';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Redirect, Stack } from 'expo-router';
import { ComponentProps, useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { AuthHeader } from '@/components';
import { useThemeColor, useWarmUpBrowser } from '@/hooks';
import Colors from '@/constants/Colors';

if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const IntroHeader = (props: NativeStackHeaderProps) => (
  <AuthHeader
    {...props}
    headerTitle=""
    headerShown={false}
    lightColor={Colors.light.background}
    darkColor={Colors.dark.background}
  />
);

const LoginHeader = (props: NativeStackHeaderProps) => (
  <AuthHeader {...props} headerTitle="Log In" />
);

const SignUpHeader = (props: NativeStackHeaderProps) => (
  <AuthHeader {...props} headerTitle="New Account" />
);

const introScreenOptions = {
  header: IntroHeader,
};

const loginScreenOptions = {
  header: LoginHeader,
};

const signupScreenOptions = {
  header: SignUpHeader,
};

const AuthLayout = () => {
  useWarmUpBrowser();

  const { isSignedIn } = useAuth();

  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');

  const screenOptions: ComponentProps<typeof Stack>['screenOptions'] = useMemo(
    () => ({
      contentStyle: { backgroundColor },
      headerTitleStyle: [styles.stackTitle, { color: primaryColor }],
      headerShadowVisible: false,
    }),
    [primaryColor, backgroundColor],
  );

  if (isSignedIn) {
    return <Redirect href={'/(home)/(tabs)'} />;
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={introScreenOptions} />
      <Stack.Screen name="login" options={loginScreenOptions} />
      <Stack.Screen name="sign-up" options={signupScreenOptions} />
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
