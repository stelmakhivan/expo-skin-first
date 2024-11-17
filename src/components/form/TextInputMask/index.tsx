import { forwardRef, useMemo } from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import NativeTextInputMask, { TextInputMaskProps } from 'react-native-text-input-mask';

import { useThemeColor } from '@/hooks';

const TextInputMask = forwardRef<NativeTextInput & typeof NativeTextInputMask, TextInputMaskProps>(
  ({ style, ...props }, ref) => {
    const primaryColor = useThemeColor({}, 'primary');

    const textInputBackgroundColor = useThemeColor({}, 'textInputBackground');
    const textInputColor = useThemeColor({}, 'textInputColor');

    const textInputStyle = useMemo(() => {
      return style
        ? [
            {
              backgroundColor: textInputBackgroundColor,
              color: textInputColor,
            },
            style,
          ]
        : {
            backgroundColor: textInputBackgroundColor,
            color: textInputColor,
          };
    }, [style, textInputBackgroundColor, textInputColor]);

    return (
      <NativeTextInputMask
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
