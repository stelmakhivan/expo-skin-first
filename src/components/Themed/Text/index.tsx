import { Text as DefaultText } from 'react-native';

import { ColorPalette } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof ColorPalette;
};

export type TextProps = ThemeProps & DefaultText['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, colorName = 'text', ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
