import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import {
  TextInput,
  Button,
  Text,
  View,
  TextInputMask,
  DateInput,
  KeyboardAvoidingScrollView,
} from '@/components';
import { useThemeColor } from '@/hooks';

const SignUp = () => {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const [date, setDate] = useState<Date>();

  const handlePasswordIconPress = () => {
    setSecurePassword((prev) => !prev);
  };

  const handleConfirmPasswordIconPress = () => {
    setSecureConfirmPassword((prev) => !prev);
  };

  return (
    <KeyboardAvoidingScrollView className="px-8">
      <Text className="font-ls-medium text-xl mb-3">Full Name</Text>
      <TextInput
        placeholder="Enter your full name"
        className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] mb-3"
      />

      <Text className="font-ls-medium text-xl mb-3">Password</Text>
      <View className="w-full mb-3">
        <TextInput
          secureTextEntry={securePassword}
          placeholder="Enter your password"
          className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] pr-14"
          verticalAlign="middle"
          textContentType="oneTimeCode"
          Icon={
            <Pressable onPress={handlePasswordIconPress} style={styles.secureIcon}>
              <Ionicons name={securePassword ? 'eye-outline' : 'eye-off-outline'} size={28} />
            </Pressable>
          }
        />
      </View>

      <Text className="font-ls-medium text-xl mb-3">Confirm Password</Text>
      <View className="w-full mb-3">
        <TextInput
          secureTextEntry={secureConfirmPassword}
          placeholder="Confirm password"
          className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] pr-14"
          verticalAlign="middle"
          textContentType="oneTimeCode"
          Icon={
            <Pressable onPress={handleConfirmPasswordIconPress} style={styles.secureIcon}>
              <Ionicons
                name={secureConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={28}
              />
            </Pressable>
          }
        />
      </View>

      <Text className="font-ls-medium text-xl mb-3">Email</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="example@example.com"
        autoCapitalize="none"
        className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] mb-3"
      />

      <Text className="font-ls-medium text-xl mb-3">Mobile Number</Text>
      <TextInputMask
        keyboardType="phone-pad"
        mask="+[0] [000] [000] [0000]"
        placeholder="+1 123 456 7890"
        className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] mb-3"
      />
      <Text className="font-ls-medium text-xl mb-3">Date of birth</Text>
      <DateInput date={date} onChange={setDate} />

      <Text className="text-center font-ls-light text-[12px] mb-3">
        By continuing, you agree to{'\n'}
        <Text className="font-ls-medium" colorName="primary">
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text className="font-ls-medium" colorName="primary">
          Privacy Policy
        </Text>
      </Text>

      <Button
        className="w-[207px] p-3 rounded-full self-center justify-center items-center mb-3 active:opacity-80"
        colorName="primary">
        <Text className="text-white font-ls-medium text-2xl leading-6">Sign Up</Text>
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
        {Platform.OS === 'ios' && (
          <Ionicons.Button
            name="logo-apple"
            size={28}
            backgroundColor={secondaryColor}
            color={primaryColor}
            borderRadius={28}
            iconStyle={styles.icon}
          />
        )}
        <Ionicons.Button
          name="logo-facebook"
          size={28}
          backgroundColor={secondaryColor}
          color={primaryColor}
          borderRadius={28}
          iconStyle={styles.icon}
        />
      </View>
      <Text className="text-center font-ls-light text-[12px] mb-12">
        already have an account?{' '}
        <Link href="/(auth)/login">
          <Text className="font-ls-medium" colorName="primary">
            Log In
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

export default SignUp;
