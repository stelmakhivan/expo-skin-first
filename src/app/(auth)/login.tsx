import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as zod from 'zod';

import { TextInput, Button, Text, View, KeyboardAvoidingScrollView } from '@/components';
import { Strategy, useSelectAuth, useThemeColor } from '@/hooks';
import { AuthAPIError, useSignIn } from '@/services';

const validationSchema = zod.object({
  email: zod.string({ required_error: 'Email is required' }).email(),
  password: zod.string({ required_error: 'Password is required' }),
});

type LogInForm = zod.infer<typeof validationSchema>;

const DEFAULT_VALUES: LogInForm = {
  email: '',
  password: '',
};

const Login = () => {
  const selectAuth = useSelectAuth();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [loading, setLoading] = useState(false);

  const onSignInPress = async (data: LogInForm) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      const errorMessage =
        (err as { errors: AuthAPIError[] }).errors[0].longMessage ?? 'An error occurred';
      if (Platform.OS === 'web') {
        return alert(errorMessage);
      }
      Alert.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  const [securePassword, setSecurePassword] = useState(true);

  const handlePasswordIconPress = () => {
    setSecurePassword((prev) => !prev);
  };

  return (
    <KeyboardAvoidingScrollView className="px-8">
      <Spinner visible={loading} />
      <Text className="font-ls-semibold text-2xl mb-3" colorName="primary">
        Welcome
      </Text>
      <Text className="font-ls-light text-[12px] mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Text>
      <Text className="font-ls-medium text-xl mb-3">Email</Text>
      <Controller
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <TextInput
            {...field}
            onChangeText={onChange}
            inputMode="email"
            placeholder="example@example.com"
            autoCapitalize="none"
            className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px]"
          />
        )}
        name="email"
      />
      <Text className="!text-red-700 min-h-[20px] mb-1">{errors.email?.message}</Text>

      <Text className="font-ls-medium text-xl mb-3">Password</Text>
      <View className="w-full">
        <Controller
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <TextInput
              {...field}
              onChangeText={onChange}
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
          )}
          name="password"
        />
        <Text className="!text-red-700 min-h-[20px] mb-1">{errors.password?.message}</Text>
      </View>
      <Text className="font-ls-medium text-[12px] text-right mb-12" colorName="primary">
        Forget Password
      </Text>

      <Button
        onPress={handleSubmit(onSignInPress)}
        className="w-[207px] p-3 rounded-full self-center justify-center items-center mb-3 active:opacity-80"
        colorName="primary">
        <Text className="!text-white font-ls-medium text-2xl leading-6">Log In</Text>
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
          onPress={() => selectAuth(Strategy.Google)}
        />
        {Platform.OS === 'ios' && (
          <Ionicons.Button
            name="logo-apple"
            size={28}
            backgroundColor={secondaryColor}
            color={primaryColor}
            borderRadius={28}
            iconStyle={styles.icon}
            onPress={() => selectAuth(Strategy.Apple)}
          />
        )}
        <Ionicons.Button
          name="logo-facebook"
          size={28}
          backgroundColor={secondaryColor}
          color={primaryColor}
          borderRadius={28}
          iconStyle={styles.icon}
          onPress={() => selectAuth(Strategy.Facebook)}
        />
      </View>
      <Text className="text-center font-ls-light text-[12px] mb-12">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up">
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
