import { useAuth } from '@/services';
import { Redirect, Stack } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { StatusBar } from '@/components';
import { useThemeColor } from '@/hooks';

const HomeLayout = () => {
  const { isSignedIn } = useAuth();

  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');

  const screenOptions = useMemo(
    () => ({
      contentStyle: { backgroundColor },
      headerTitleStyle: [styles.stackTitle, { color: primaryColor }],
      headerShadowVisible: false,
      header: () => <StatusBar />,
    }),
    [primaryColor, backgroundColor],
  );

  if (!isSignedIn) {
    return <Redirect href={'/(auth)'} />;
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

const styles = StyleSheet.create({
  stackTitle: {
    fontFamily: 'ls-semibold',
    fontSize: 24,
  },
});

export default HomeLayout;
