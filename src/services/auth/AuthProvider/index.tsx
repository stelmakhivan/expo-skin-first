import { TokenCache } from '@/services';
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

export * from '@clerk/clerk-expo';
// TODO: @clerk/clerk-expo is broken for expo 51 for now; update the package.json version when it's fixed
// export { ClerkProvider as AuthProvider } from '@clerk/clerk-expo';

interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  publishableKey: string;
  tokenCache?: TokenCache;
}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [isLoaded] = useState(true);
  const [isSignedIn] = useState(false);

  const value: AuthContextType = useMemo(() => ({ isLoaded, isSignedIn }), [isLoaded, isSignedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
