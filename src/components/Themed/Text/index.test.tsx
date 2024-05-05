import { render } from '@testing-library/react-native';
import React from 'react';

import { Text, TextProps } from '.';

import { useThemeColor } from '@/hooks/useThemeColor';

jest.mock('@/hooks/useThemeColor');

describe('Themed Text', () => {
  it('renders with provided light color when theme is light', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#529ace');
    const props: TextProps = { lightColor: '#529ace', darkColor: '#002e4b' };

    const { getByText } = render(<Text {...props}>Test</Text>);

    expect(getByText('Test')).toHaveStyle({ color: '#529ace' });
  });

  it('renders with provided dark color when theme is dark', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#002e4b');
    const props: TextProps = { lightColor: '#529ace', darkColor: '#002e4b' };

    const { getByText } = render(<Text {...props}>Test</Text>);

    expect(getByText('Test')).toHaveStyle({ color: '#002e4b' });
  });
});
