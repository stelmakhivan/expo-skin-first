import { StatusBar } from 'expo-status-bar';
import { useMemo, FC } from 'react';
import { Platform, StatusBar as NativeStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View } from '../View';

import { useThemeColor } from '@/hooks';
import { ColorPalette } from '@/constants/Colors';

export type StatusBarProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof ColorPalette;
};

const StyledStatusBar: FC<StatusBarProps> = (props) => {
  const { lightColor, darkColor } = props;
  const statusBarColor = useThemeColor({ light: lightColor, dark: darkColor }, 'statusBar');
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
      <StatusBar style="auto" />
      <View style={statusBarStyle} />
    </>
  );
};

export { StyledStatusBar as StatusBar };
