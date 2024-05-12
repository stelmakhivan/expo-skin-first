import { ClerkProviderProps } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

export interface TokenCache {
  getToken: NonNullable<ClerkProviderProps['tokenCache']>['getToken'];
  saveToken: NonNullable<ClerkProviderProps['tokenCache']>['saveToken'];
}

class AuthTokenCache implements TokenCache {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.warn('[AuthTokenCache] getToken error: ', err);
      return null;
    }
  }

  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.warn('[AuthTokenCache] saveToken error: ', err);
      return;
    }
  }
}

export const tokenCache = new AuthTokenCache();
