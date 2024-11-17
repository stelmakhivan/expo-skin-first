import { getDefaultConfig } from 'expo/metro-config';
import { withNativeWind } from 'nativewind/metro';

const config = getDefaultConfig(__dirname);

// getCSSForPlatform is handled inside withNativeWind
// there is an issue with library types
// @ts-expect-error
module.exports = withNativeWind(config, { input: './global.css' });
