import { StartOAuthFlowParams, StartOAuthFlowReturnType, useOAuth } from '@/services';
import { useCallback } from 'react';

export enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

export const useSelectAuth = () => {
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

  return useCallback(
    async (strategy: Strategy) => {
      const selectedAuth: (
        startOAuthFlowParams?: StartOAuthFlowParams,
      ) => Promise<StartOAuthFlowReturnType> = {
        [Strategy.Google]: googleAuth,
        [Strategy.Apple]: appleAuth,
        [Strategy.Facebook]: facebookAuth,
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
    [appleAuth, facebookAuth, googleAuth],
  );
};
