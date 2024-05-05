import { Link, Stack } from 'expo-router';
import { ComponentProps } from 'react';

import { Text, View } from '@/components/Themed';

const screenOptions: ComponentProps<typeof Stack.Screen>['options'] = {
  title: 'Oops!',
};

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={screenOptions} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">This screen doesn't exist.</Text>

        <Link href="/" className="m-4 p-4">
          <Text className="text-sm" colorName="primary">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
