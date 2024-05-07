import { Ionicons } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { FC, useMemo } from 'react';
import { Platform, Pressable, StatusBar as NativeStatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AuthHeaderProps extends NativeStackHeaderProps {
  headerTitle: string;
}

const AuthHeader: FC<AuthHeaderProps> = (props) => {
  const primaryColor = useThemeColor({}, 'primary');
  const statusBarColor = useThemeColor({}, 'statusBar');
  const { top } = useSafeAreaInsets();

  const router = useRouter();

  const statusBarStyle = useMemo(
    () => ({
      height: Platform.select({
        android: NativeStatusBar.currentHeight,
        default: top,
      }),
      backgroundColor: statusBarColor,
    }),
    [top, statusBarColor],
  );

  return (
    <>
      <View style={statusBarStyle} />
      <View className="flex-row items-center justify-center py-8 px-8">
        <Pressable onPress={router.back} style={styles.backIcon}>
          <Ionicons color={primaryColor} name="chevron-back" size={28} />
        </Pressable>
        <Text style={props.options.headerTitleStyle}>{props.headerTitle}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    left: 24,
  },
});

export { AuthHeader };
