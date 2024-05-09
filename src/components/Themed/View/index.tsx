import { View as DefaultView } from 'react-native';

import { ColorPalette } from '@/constants/Colors';
import { useThemeColor } from '@/hooks';
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof ColorPalette;
};

export type ViewProps = ThemeProps & DefaultView['props'];

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, colorName = 'background', ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
