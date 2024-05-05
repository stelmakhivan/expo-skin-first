import { useMemo } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType } from 'react-native';

import { ColorPalette } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof ColorPalette;
};

export type ButtonProps = ThemeProps & PressableProps;

export function Button(props: ButtonProps) {
  const { style, lightColor, darkColor, colorName = 'background', ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  const resolvedStyle = useMemo(() => {
    return typeof style === 'function'
      ? (state: PressableStateCallbackType) => [{ backgroundColor }, style(state)]
      : [{ backgroundColor }, style];
  }, [backgroundColor, style]);

  return <Pressable style={resolvedStyle} {...otherProps} />;
}
