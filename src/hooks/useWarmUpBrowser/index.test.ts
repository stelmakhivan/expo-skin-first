import { renderHook } from '@testing-library/react-native';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { useWarmUpBrowser } from '.';

jest.mock('expo-web-browser', () => ({
  warmUpAsync: jest.fn(),
  coolDownAsync: jest.fn(),
}));

describe('useWarmUpBrowser', () => {
  it('calls warmUpAsync and coolDownAsync on Android', () => {
    Platform.OS = 'android';
    const { unmount } = renderHook(() => useWarmUpBrowser());

    expect(WebBrowser.warmUpAsync).toHaveBeenCalled();

    unmount();

    expect(WebBrowser.coolDownAsync).toHaveBeenCalled();
  });

  it('does not call warmUpAsync and coolDownAsync on non-Android platforms', () => {
    Platform.OS = 'ios';
    const { unmount } = renderHook(() => useWarmUpBrowser());

    expect(WebBrowser.warmUpAsync).not.toHaveBeenCalled();

    unmount();

    expect(WebBrowser.coolDownAsync).not.toHaveBeenCalled();
  });
});
