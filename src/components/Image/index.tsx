import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';

const Image = ExpoImage;

cssInterop(Image, { className: 'style' });

export { Image };
