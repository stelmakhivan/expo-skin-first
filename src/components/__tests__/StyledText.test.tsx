import { render } from '@testing-library/react-native';

import { MonoText } from '../StyledText';

describe(`StyledText`, () => {
  it(`renders correctly`, () => {
    const { getByText } = render(<MonoText>Test!</MonoText>);

    expect(getByText('Test!')).toBeDefined();
  });
});
