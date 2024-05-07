const whiteColor = '#ffffff';
const blackColor = '#000000';

const primaryColor = '#2260FF';

export interface ColorPalette {
  text: string;
  primary: string;
  secondary: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  statusBar: string;
  textInputBackground: string;
  textInputColor: string;
}

export interface ColorsMap {
  light: ColorPalette;
  dark: ColorPalette;
}

const Colors: ColorsMap = {
  light: {
    text: blackColor,
    primary: primaryColor,
    secondary: '#CAD6FF',
    background: whiteColor,
    tint: primaryColor,
    tabIconDefault: '#ccc',
    tabIconSelected: primaryColor,
    statusBar: 'rgba(226, 234, 255, 0.66)',
    textInputBackground: '#ECF1FF',
    textInputColor: '#809CFF',
  },
  dark: {
    text: whiteColor,
    primary: primaryColor,
    secondary: '#CAD6FF',
    background: blackColor,
    tint: whiteColor,
    tabIconDefault: '#ccc',
    tabIconSelected: whiteColor,
    statusBar: 'rgba(34, 96, 255, 0.66)',
    textInputBackground: '#ECF1FF',
    textInputColor: '#809CFF',
  },
};

export default Colors;
