import { useThemeColor } from '@/hooks';
import { Tabs } from 'expo-router';
import { ComponentProps, useMemo } from 'react';

const TabsLayout = () => {
  const backgroundColor = useThemeColor({}, 'background');

  const screenOptions: ComponentProps<typeof Tabs>['screenOptions'] = useMemo(
    () => ({ sceneStyle: { backgroundColor } }),
    [backgroundColor],
  );

  return <Tabs screenOptions={screenOptions} />;
};

export default TabsLayout;
