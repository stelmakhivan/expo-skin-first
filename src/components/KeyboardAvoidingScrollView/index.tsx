import { useHeaderHeight } from '@react-navigation/elements';
import { FC, PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps } from 'react-native';

const KeyboardAvoidingScrollView: FC<PropsWithChildren<ScrollViewProps>> = ({
  children,
  ...props
}) => {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={headerHeight}>
      <ScrollView keyboardShouldPersistTaps="handled" {...props}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { KeyboardAvoidingScrollView };
