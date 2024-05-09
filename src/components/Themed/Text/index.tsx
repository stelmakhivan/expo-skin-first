import { Text as DefaultText, TextProps as DefaultTextProps } from 'react-native';

import { ColorPalette } from '@/constants/Colors';
import { useThemeColor } from '@/hooks';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof ColorPalette;
};

export type TextProps = ThemeProps & DefaultTextProps;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, colorName = 'text', ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
