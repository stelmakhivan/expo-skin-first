import { renderHook, act } from '@testing-library/react-native';
import { useSelectAuth, Strategy } from '.';
import { useOAuth } from '@/services';

jest.mock('expo-router', () => ({
  usePathname: jest.fn(),
}));
jest.mock('expo-auth-session', () => ({
  makeRedirectUri: jest.fn(),
}));

jest.mock('@/services', () => ({
  useOAuth: jest.fn(),
}));

describe('useSelectAuth', () => {
  const setActiveMock = jest.fn();

  const mockAuth = jest
    .fn()
    .mockResolvedValue({ createdSessionId: 'session-id', setActive: setActiveMock });
  (useOAuth as jest.Mock).mockReturnValue({ startOAuthFlow: mockAuth });

  it('calls the correct auth strategy', async () => {
    const { result } = renderHook(useSelectAuth);
    await act(() => result.current(Strategy.Google));

    expect(mockAuth).toHaveBeenCalledTimes(1);
    expect(setActiveMock).toHaveBeenCalledWith({ session: 'session-id' });
  });

  it('does not call auth strategy if not selected', async () => {
    const { result } = renderHook(useSelectAuth);
    await act(() => result.current(Strategy.Apple));

    expect(mockAuth).toHaveBeenCalledTimes(1);
    expect(setActiveMock).toHaveBeenCalledWith({ session: 'session-id' });
  });

  it('handles error from auth strategy', async () => {
    const error = new Error('error');

    console.error = jest.fn();

    const setActiveMock = jest.fn().mockRejectedValue(new Error('error'));

    const mockAuth = jest
      .fn()
      .mockResolvedValueOnce({ createdSessionId: 'session-id', setActive: setActiveMock });
    (useOAuth as jest.Mock).mockReturnValue({ startOAuthFlow: mockAuth });

    const { result } = renderHook(useSelectAuth);
    await act(() => result.current(Strategy.Facebook));

    expect(mockAuth).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('OAuth error', error);
  });
});
