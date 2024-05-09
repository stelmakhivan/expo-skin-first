import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { AuthHeader } from '@/components';
import { useThemeColor, useWarmUpBrowser } from '@/hooks';

const AuthLayout = () => {
  useWarmUpBrowser();

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
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          header: (props) => <AuthHeader {...props} headerTitle="Log In" />,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          header: (props) => <AuthHeader {...props} headerTitle="New Account" />,
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
