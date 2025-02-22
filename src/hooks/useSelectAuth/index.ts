import { StartSSOFlowParams, StartSSOFlowReturnType, useSSO } from '@/services';
import { makeRedirectUri } from 'expo-auth-session';
import { usePathname } from 'expo-router';
import { useCallback } from 'react';

export enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

export const useSelectAuth = () => {
  const currentRoute = usePathname();
  const redirectUri = makeRedirectUri({
    path: currentRoute,
  });

  const { startSSOFlow: googleAuth } = useSSO();
  const { startSSOFlow: appleAuth } = useSSO();
  const { startSSOFlow: facebookAuth } = useSSO();

  return useCallback(
    async (strategy: Strategy) => {
      const selectedAuth: (
        startOAuthFlowParams?: StartSSOFlowParams,
      ) => Promise<StartSSOFlowReturnType> = {
        [Strategy.Google]: () => googleAuth({ strategy: 'oauth_google', redirectUrl: redirectUri }),
        [Strategy.Apple]: () => appleAuth({ strategy: 'oauth_apple', redirectUrl: redirectUri }),
        [Strategy.Facebook]: () =>
          facebookAuth({ strategy: 'oauth_facebook', redirectUrl: redirectUri }),
      }[strategy];

      try {
        const { createdSessionId, setActive } = await selectedAuth();

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        }
      } catch (err) {
        console.error('OAuth error', err);
      }
    },
    [appleAuth, facebookAuth, googleAuth, redirectUri],
  );
};
