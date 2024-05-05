const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export interface ColorPalette {
  text: string;
  primary: string;
  secondary: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export interface ColorsMap {
  light: ColorPalette;
  dark: ColorPalette;
}

const Colors: ColorsMap = {
  light: {
    text: '#000',
    primary: '#2260FF',
    secondary: '#CAD6FF',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    primary: '#2260FF',
    secondary: '#CAD6FF',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export default Colors;
