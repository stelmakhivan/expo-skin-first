import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { Platform, StatusBar as NativeStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View } from '../View';

import { useThemeColor } from '@/hooks/useThemeColor';

const StyledStatusBar = () => {
  const statusBarColor = useThemeColor({}, 'statusBar');
  const { top } = useSafeAreaInsets();

  const statusBarStyle = useMemo(
    () => ({
      height: Platform.select({
        android: NativeStatusBar.currentHeight,
        default: top,
      }),
      backgroundColor: statusBarColor,
    }),
    [top, statusBarColor],
  );
  return (
    <>
      <StatusBar style="auto" backgroundColor={statusBarColor} />
      <View style={statusBarStyle} />
    </>
  );
};

export { StyledStatusBar as StatusBar };
