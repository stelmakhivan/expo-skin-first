import { ImageSourcePropType } from 'react-native';

interface ImagesMap {
  logo: ImageSourcePropType;
}

const Images: ImagesMap = {
  logo: require('../../assets/images/logo.png'),
};

export default Images;
