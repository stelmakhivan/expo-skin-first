import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

import Colors, { ColorPalette } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof ColorPalette,
) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const nativeColorScheme = useNativeColorScheme() ?? 'light';

  const colorFromProps = props[colorScheme];

  useEffect(() => {
    setColorScheme(nativeColorScheme);
  }, [nativeColorScheme]);

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorScheme][colorName];
  }
}
