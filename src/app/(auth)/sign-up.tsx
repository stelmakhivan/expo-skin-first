import { validateAge } from '@/utils';
import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'expo-router';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { PASSWORD_REGEXP, PHONE_REGEXP } from '@/constants/RegExp';

import {
  TextInput,
  Button,
  Text,
  View,
  TextInputMask,
  DateInput,
  KeyboardAvoidingScrollView,
} from '@/components';
import { useSelectAuth, useThemeColor, Strategy } from '@/hooks';
import { AuthAPIError, useSignUp } from '@/services';

const validationSchema = zod
  .object({
    fullName: zod.string({ required_error: 'Full Name is required' }).min(2).max(50),
    password: zod.string({ required_error: 'Password is required' }).regex(PASSWORD_REGEXP, {
      message:
        'Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    confirmPassword: zod.string({ required_error: 'Confirm Password is required' }),
    email: zod.string({ required_error: 'Email is required' }).email(),
    phone: zod.string({ required_error: 'Phone Number is required' }).regex(PHONE_REGEXP, {
      message: 'Your phone number is not valid',
    }),
    dateOfBirth: zod.date().refine(validateAge, {
      message: 'You must be at least 18 years old to sign up.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpForm = zod.infer<typeof validationSchema>;

const DEFAULT_VALUES: SignUpForm = {
  fullName: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  dateOfBirth: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
};

const SignUp = () => {
  const selectAuth = useSelectAuth();
  const { isLoaded, signUp, setActive } = useSignUp();

  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const [loading, setLoading] = useState(false);

  const handlePasswordIconPress = () => {
    setSecurePassword((prev) => !prev);
  };

  const handleConfirmPasswordIconPress = () => {
    setSecureConfirmPassword((prev) => !prev);
  };

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUpPress = async (data: SignUpForm) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        unsafeMetadata: {
          fullName: data.fullName,
          dateOfBirth: format(data.dateOfBirth, 'dd/MM/yyyy'),
          phoneNumber: data.phone,
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err) {
      const errorMessage = (err as { errors: AuthAPIError[] }).errors[0].message;
      if (Platform.OS === 'web') {
        return alert(errorMessage);
      }
      Alert.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      const errorMessage = (err as { errors: AuthAPIError[] }).errors[0].message;
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
  } = useForm<SignUpForm>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  return (
    <KeyboardAvoidingScrollView className="px-8">
      <Spinner visible={loading} />
      {!pendingVerification ? (
        <>
          <Text className="font-ls-medium text-xl mb-2">Full Name</Text>
          <Controller
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <TextInput
                {...field}
                onChangeText={onChange}
                placeholder="Enter your full name"
                className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px]"
              />
            )}
            name="fullName"
          />
          <Text className="!text-red-700 min-h-[20px] mb-1">{errors.fullName?.message}</Text>

          <Text className="font-ls-medium text-xl mb-2">Password</Text>
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
                      <Ionicons
                        name={securePassword ? 'eye-outline' : 'eye-off-outline'}
                        size={28}
                      />
                    </Pressable>
                  }
                />
              )}
              name="password"
            />
            <Text className="!text-red-700 min-h-[20px] mb-1">{errors.password?.message}</Text>
          </View>

          <Text className="font-ls-medium text-xl mb-2">Confirm Password</Text>
          <View className="w-full">
            <Controller
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <TextInput
                  {...field}
                  onChangeText={onChange}
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
              )}
              name="confirmPassword"
            />
            <Text className="!text-red-700 min-h-[20px] mb-1">
              {errors.confirmPassword?.message}
            </Text>
          </View>

          <Text className="font-ls-medium text-xl mb-2">Email</Text>
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

          <Text className="font-ls-medium text-xl mb-2">Mobile Number</Text>
          <Controller
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <TextInputMask
                {...field}
                onChangeText={onChange}
                inputMode="tel"
                mask="+[0] [000] [000] [0000]"
                placeholder="+1 123 456 7890"
                className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px]"
              />
            )}
            name="phone"
          />
          <Text className="!text-red-700 min-h-[20px] mb-1">{errors.phone?.message}</Text>

          <Text className="font-ls-medium text-xl mb-2">Date of birth</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value, ref, ...field } }) => (
              <DateInput {...field} date={value} onChange={onChange} />
            )}
            name="dateOfBirth"
          />
          <Text className="!text-red-700 min-h-[20px] mb-8">{errors.dateOfBirth?.message}</Text>

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
            onPress={handleSubmit(onSignUpPress)}
            className="w-[207px] p-3 rounded-full self-center justify-center items-center mb-3 active:opacity-80"
            colorName="primary">
            <Text className="!text-white font-ls-medium text-2xl leading-6">Sign Up</Text>
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
            already have an account?{' '}
            <Link href="/login">
              <Text className="font-ls-medium" colorName="primary">
                Log In
              </Text>
            </Link>
          </Text>
        </>
      ) : (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={setCode}
            className="h-[45px] rounded-[13px] px-4 font-ls-regular text-[20px] mb-8"
          />
          <Button
            onPress={onPressVerify}
            className="w-[207px] p-3 rounded-full self-center justify-center items-center mb-3 active:opacity-80"
            colorName="primary">
            <Text className="text-white font-ls-medium text-2xl leading-6">Verify Email</Text>
          </Button>
        </>
      )}
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
