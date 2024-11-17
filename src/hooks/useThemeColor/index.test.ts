import { renderHook } from '@testing-library/react-native';
import { useColorScheme } from 'nativewind';

import { useThemeColor } from '.';

import Colors from '@/constants/Colors';

jest.mock('nativewind', () => ({
  useColorScheme: jest.fn(),
}));

describe('useThemeColor', () => {
  it('returns color from props when provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue({
      colorScheme: 'light',
    });

    const { result } = renderHook(() =>
      useThemeColor({ light: 'light-blue', dark: 'dark-blue' }, 'text'),
    );

    expect(result.current).toBe('light-blue');
  });

  it('returns color from Colors when not provided in props', () => {
    (useColorScheme as jest.Mock).mockReturnValue({
      colorScheme: 'dark',
    });

    const { result } = renderHook(() => useThemeColor({}, 'background'));

    expect(result.current).toBe(Colors.dark.background);
  });
});
