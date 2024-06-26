import { styled } from 'nativewind';
import { forwardRef, useMemo } from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import NativeTextInputMask, { TextInputMaskProps } from 'react-native-text-input-mask';

import { useThemeColor } from '@/hooks';

const StyledTextInputMask = styled(NativeTextInputMask);

interface Props extends TextInputMaskProps {}

const TextInputMask = forwardRef<NativeTextInput & typeof StyledTextInputMask, Props>(
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
      <StyledTextInputMask
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
