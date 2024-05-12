import { FC, PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const GestureHandlerView: FC<PropsWithChildren> = ({ children }) => {
  return <GestureHandlerRootView className="flex-1">{children}</GestureHandlerRootView>;
};

export { GestureHandlerView };
