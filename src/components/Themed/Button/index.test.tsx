import { render } from '@testing-library/react-native';
import React from 'react';

import { Button, ButtonProps } from '.';

import { useThemeColor } from '@/hooks/useThemeColor';

jest.mock('@/hooks/useThemeColor');

describe('Themed Button', () => {
  it('renders with provided light color when theme is light', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#529ace');
    const props: ButtonProps = { lightColor: '#529ace', darkColor: '#002e4b', testID: 'test' };

    const { getByTestId } = render(<Button {...props}>Test</Button>);

    expect(getByTestId(props.testID!)).toHaveStyle({ backgroundColor: '#529ace' });
  });

  it('renders with provided dark color when theme is dark', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#002e4b');
    const props: ButtonProps = { lightColor: '#529ace', darkColor: '#002e4b', testID: 'test' };

    const { getByTestId } = render(<Button {...props}>Test</Button>);

    expect(getByTestId(props.testID!)).toHaveStyle({ backgroundColor: '#002e4b' });
  });
});
