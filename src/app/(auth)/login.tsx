import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { TextInput, Button, Text, View, KeyboardAvoidingScrollView } from '@/components';
import { useThemeColor } from '@/hooks/useThemeColor';

const Login = () => {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  const [securePassword, setSecurePassword] = useState(true);

  const handlePasswordIconPress = () => {
    setSecurePassword((prev) => !prev);
  };

  return (
    <KeyboardAvoidingScrollView className="px-8">
      <Text className="font-ls-semibold text-2xl mb-3" colorName="primary">
        Welcome
      </Text>
      <Text className="font-ls-light text-[12px] mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Text>
      <Text className="font-ls-medium text-xl mb-3">Email</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="example@example.com"
        autoCapitalize="none"
        className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] mb-8"
      />

      <Text className="font-ls-medium text-xl mb-3">Password</Text>
      <View className="w-full mb-3">
        <TextInput
          secureTextEntry={securePassword}
          placeholder="Enter your password"
          className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] pr-14"
          verticalAlign="middle"
          Icon={
            <Pressable onPress={handlePasswordIconPress} style={styles.secureIcon}>
              <Ionicons name={securePassword ? 'eye-outline' : 'eye-off-outline'} size={28} />
            </Pressable>
          }
        />
      </View>
      <Text className="font-ls-medium text-[12px] text-right mb-12" colorName="primary">
        Forget Password
      </Text>

      <Button
        className="w-[207px] p-3 rounded-full self-center justify-center items-center mb-3 active:opacity-80"
        colorName="primary">
        <Text className="text-white font-ls-medium text-2xl leading-6">Log In</Text>
      </Button>

      <Text className="font-ls-light text-[12px] text-center mb-3">or sign up with</Text>
      <View
        className="flex-row items-center justify-center mb-8"
        style={styles.socialIconsContainer}>
        <Ionicons.Button
          name="logo-google"
          size={28}
          backgroundColor={secondaryColor}
          color={primaryColor}
          borderRadius={28}
          iconStyle={styles.icon}
        />
        <Ionicons.Button
          name="logo-apple"
          size={28}
          backgroundColor={secondaryColor}
          color={primaryColor}
          borderRadius={28}
          iconStyle={styles.icon}
        />
      </View>
      <Text className="text-center font-ls-light text-[12px] mb-12">
        Don't have an account?{' '}
        <Link href="/(auth)/sign-up">
          <Text className="font-ls-medium" colorName="primary">
            Sign Up
          </Text>
        </Link>
      </Text>
    </KeyboardAvoidingScrollView>
  );
};

const styles = StyleSheet.create({
  secureIcon: {
    position: 'absolute',
    right: 16,
    top: 9,
  },
  socialIconsContainer: {
    gap: 8,
  },
  icon: {
    marginRight: 0,
  },
});

export default Login;
