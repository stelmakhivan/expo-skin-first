import { forwardRef, useMemo } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, View } from 'react-native';

import { ColorPalette } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof ColorPalette;
};

export type ButtonProps = ThemeProps & PressableProps;

const Button = forwardRef<View, ButtonProps>((props: ButtonProps, ref) => {
  const { style, lightColor, darkColor, colorName = 'background', ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  const resolvedStyle = useMemo(() => {
    return typeof style === 'function'
      ? (state: PressableStateCallbackType) => [{ backgroundColor }, style(state)]
      : [{ backgroundColor }, style];
  }, [backgroundColor, style]);

  return <Pressable style={resolvedStyle} {...otherProps} ref={ref} />;
});

Button.displayName = 'Button';

export { Button };
