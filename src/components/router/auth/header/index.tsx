import { Ionicons } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { StatusBar, Text, View } from '@/components/Themed';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AuthHeaderProps extends NativeStackHeaderProps {
  headerTitle: string;
}

const AuthHeader: FC<AuthHeaderProps> = (props) => {
  const primaryColor = useThemeColor({}, 'primary');

  const router = useRouter();

  return (
    <>
      <StatusBar />
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
