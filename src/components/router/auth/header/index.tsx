import { Ionicons } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { StatusBar, Text, View, type StatusBarProps } from '@/components/Themed';
import { useThemeColor } from '@/hooks';

interface AuthHeaderProps extends NativeStackHeaderProps {
  headerTitle: string;
  headerShown?: boolean;
  lightColor?: StatusBarProps['lightColor'];
  darkColor?: StatusBarProps['darkColor'];
}

const AuthHeader: FC<AuthHeaderProps> = (props) => {
  const primaryColor = useThemeColor({}, 'primary');

  const router = useRouter();

  const canGoBack = router.canGoBack();

  const isVisibleHeader = props.headerShown ?? true;

  return (
    <>
      <StatusBar lightColor={props.lightColor} darkColor={props.darkColor} />
      {isVisibleHeader && (
        <View className="flex-row items-center justify-center py-8 px-8">
          {canGoBack ? (
            <Pressable onPress={router.back} style={styles.backIcon}>
              <Ionicons color={primaryColor} name="chevron-back" size={28} />
            </Pressable>
          ) : (
            <View style={styles.backIcon} />
          )}
          <Text style={props.options.headerTitleStyle}>{props.headerTitle}</Text>
        </View>
      )}
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
