import { forwardRef, useMemo } from 'react';
import { StyleSheet, TextInput as NativeTextInput, TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

interface Props extends TextInputProps {
  keyboardType?: TextInputProps['keyboardType'];
}

const TextInputMask = forwardRef<NativeTextInput, Props>(
  ({ style, keyboardType, ...props }, ref) => {
    const primaryColor = useThemeColor({}, 'primary');

    const textInputBackgroundColor = useThemeColor({}, 'textInputBackground');
    const textInputColor = useThemeColor({}, 'textInputColor');

    const textInputStyle = useMemo(() => {
      return style
        ? StyleSheet.flatten([
            {
              backgroundColor: textInputBackgroundColor,
              color: textInputColor,
            },
            style,
          ])
        : {
            backgroundColor: textInputBackgroundColor,
            color: textInputColor,
          };
    }, [style, textInputBackgroundColor, textInputColor]);

    return (
      <NativeTextInput
        {...props}
        ref={ref}
        cursorColor={primaryColor}
        selectionColor={primaryColor}
        placeholderTextColor={textInputColor}
        style={textInputStyle}
      />
    );
  },
);

TextInputMask.displayName = 'TextInputMask';

export { TextInputMask };
