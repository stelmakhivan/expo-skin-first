import { tokenCache } from '.';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

describe('AuthTokenCache', () => {
  console.warn = jest.fn();

  it('retrieves token from secure store', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');
    const result = await tokenCache.getToken('mockKey');
    expect(result).toBe('mockToken');
  });

  it('returns null when secure store throws an error', async () => {
    const error = new Error('Error');
    (SecureStore.getItemAsync as jest.Mock).mockRejectedValue(error);
    const result = await tokenCache.getToken('mockKey');
    expect(result).toBeNull();
    expect(console.warn).toHaveBeenCalledWith('[AuthTokenCache] getToken error: ', error);
  });

  it('saves token to secure store', async () => {
    await tokenCache.saveToken('mockKey', 'mockToken');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('mockKey', 'mockToken');
  });

  it('handles error when saving token to secure store', async () => {
    const error = new Error('Error');
    (SecureStore.setItemAsync as jest.Mock).mockRejectedValue(error);
    await tokenCache.saveToken('mockKey', 'mockToken');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('mockKey', 'mockToken');
    expect(console.warn).toHaveBeenCalledWith('[AuthTokenCache] saveToken error: ', error);
  });
});
