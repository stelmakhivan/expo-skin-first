import { renderHook } from '@testing-library/react-native';
import { useColorScheme } from 'nativewind';
import * as ReactNative from 'react-native';

import { useThemeColor } from '.';

import Colors from '@/constants/Colors';

jest.mock('nativewind', () => ({
  useColorScheme: jest.fn(),
}));

describe('useThemeColor', () => {
  const useColorSchemeMock = jest.spyOn(ReactNative, 'useColorScheme');

  it('returns color from props when provided', () => {
    useColorSchemeMock.mockReturnValueOnce('light');
    (useColorScheme as jest.Mock).mockReturnValue({
      colorScheme: 'light',
      setColorScheme: jest.fn(),
    });

    const { result } = renderHook(() =>
      useThemeColor({ light: 'light-blue', dark: 'dark-blue' }, 'text'),
    );

    expect(result.current).toBe('light-blue');
  });

  it('returns color from Colors when not provided in props', () => {
    useColorSchemeMock.mockReturnValueOnce('light');
    (useColorScheme as jest.Mock).mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: jest.fn(),
    });

    const { result } = renderHook(() => useThemeColor({}, 'background'));

    expect(result.current).toBe(Colors.dark.background);
  });

  it('should set color scheme', () => {
    useColorSchemeMock.mockReturnValueOnce('light');
    const setColorSchemeMock = jest.fn();
    (useColorScheme as jest.Mock).mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: setColorSchemeMock,
    });

    renderHook(() => useThemeColor({}, 'background'));

    expect(setColorSchemeMock).toHaveBeenCalledWith('light');
  });

  it('should not set color scheme if undefined', () => {
    useColorSchemeMock.mockReturnValueOnce(null);
    const setColorSchemeMock = jest.fn();
    (useColorScheme as jest.Mock).mockReturnValue({
      colorScheme: 'dark',
      setColorScheme: setColorSchemeMock,
    });

    const { result } = renderHook(() => useThemeColor({}, 'background'));

    expect(setColorSchemeMock).not.toHaveBeenCalledWith(null);
    expect(result.current).toBe(Colors.dark.background);
  });
});
