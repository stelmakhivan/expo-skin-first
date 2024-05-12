import { FC, Fragment, PropsWithChildren } from 'react';

const GestureHandlerView: FC<PropsWithChildren> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export { GestureHandlerView };
