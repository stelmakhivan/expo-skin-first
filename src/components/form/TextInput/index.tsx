import { forwardRef, ReactNode, useMemo } from 'react';
import { TextInput as NativeTextInput, TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks';

interface Props extends TextInputProps {
  Icon?: ReactNode;
}

const TextInput = forwardRef<NativeTextInput, Props>(({ style, ...props }, ref) => {
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
    <>
      <NativeTextInput
        {...props}
        ref={ref}
        cursorColor={primaryColor}
        selectionColor={primaryColor}
        placeholderTextColor={textInputColor}
        style={textInputStyle}
      />
      {props.Icon ? props.Icon : null}
    </>
  );
});

TextInput.displayName = 'TextInput';

export { TextInput };
