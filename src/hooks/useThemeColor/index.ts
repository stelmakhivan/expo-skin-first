import { useColorScheme } from 'nativewind';

import Colors, { ColorPalette } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof ColorPalette,
) {
  const { colorScheme = 'light' } = useColorScheme();

  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorScheme][colorName];
  }
}
