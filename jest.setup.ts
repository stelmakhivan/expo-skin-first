import 'react-native-gesture-handler/jestSetup';

import '@testing-library/react-native/extend-expect';
import '@testing-library/jest-native/';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

require('react-native-reanimated').setUpTests();
