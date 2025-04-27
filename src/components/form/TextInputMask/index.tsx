import { forwardRef, useMemo } from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import { MaskedTextInput, MaskedTextInputProps } from 'react-native-advanced-input-mask';

import { useThemeColor } from '@/hooks';

const TextInputMask = forwardRef<NativeTextInput & typeof MaskedTextInput, MaskedTextInputProps>(
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
      <MaskedTextInput
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
