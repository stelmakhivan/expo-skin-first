import { Image } from 'expo-image';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, Button, View } from '@/components/Themed';
import Images from '@/constants/Images';

const Register = () => {
  const { bottom } = useSafeAreaInsets();

  const footerStyle = useMemo(() => ({ marginBottom: bottom ? 0 : 24 }), [bottom]);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View className="flex-1 justify-center">
          <Image className="self-center mb-8 w-[138px] h-[138px]" source={Images.logo} />
          <Text className="text-center font-ls-thin text-6xl mb-3" colorName="primary">
            Skin{'\n'}First
          </Text>
          <Text className="text-center font-ls-semibold text-base mb-10" colorName="primary">
            Dermatology center
          </Text>
          <Text className="text-center font-ls-thin text-base px-10 mb-5" colorName="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={footerStyle}>
          <Button
            className="w-[207px] p-3 rounded-full self-center justify-center items-center mb-4 active:opacity-80"
            colorName="primary">
            <Text className="text-white font-ls-medium text-2xl leading-6">Log In</Text>
          </Button>
          <Button
            className="w-[207px] p-3 rounded-full self-center justify-center items-center active:opacity-80"
            colorName="secondary">
            <Text className="font-ls-medium text-2xl leading-6" colorName="primary">
              Sign Up
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
});

export default Register;
