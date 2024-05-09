import { render } from '@testing-library/react-native';
import React from 'react';

import { View, ViewProps } from '.';

import { useThemeColor } from '@/hooks';

jest.mock('@/hooks');

describe('Themed View', () => {
  it('renders with provided light color when theme is light', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#529ace');
    const props: ViewProps = { lightColor: '#529ace', darkColor: '#002e4b', testID: 'test' };

    const { getByTestId } = render(<View {...props}>Test</View>);

    expect(getByTestId(props.testID!)).toHaveStyle({ backgroundColor: '#529ace' });
  });

  it('renders with provided dark color when theme is dark', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#002e4b');
    const props: ViewProps = { lightColor: '#529ace', darkColor: '#002e4b', testID: 'test' };

    const { getByTestId } = render(<View {...props}>Test</View>);

    expect(getByTestId(props.testID!)).toHaveStyle({ backgroundColor: '#002e4b' });
  });
});
