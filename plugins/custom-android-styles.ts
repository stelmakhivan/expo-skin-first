import { ExportedConfigWithProps, withAndroidStyles } from '@expo/config-plugins';
import { ResourceXML } from '@expo/config-plugins/build/android/Resources';
import { ExpoConfig } from 'expo/config';

import Colors from '../src/constants/Colors';

const withCustomStyles = (config: ExpoConfig) => {
  return withAndroidStyles(config, async (config) => {
    config.modResults = applyCustomStyles(config.modResults);
    return config;
  });
};

function applyCustomStyles(styles: ExportedConfigWithProps<ResourceXML>['modResults']) {
  const appTheme = styles.resources.style?.find((style) => style.$.name === 'AppTheme');
  if (appTheme) {
    appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:datePickerDialogTheme' } });
    appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:timePickerDialogTheme' } });
  }

  // Add new style definition
  styles.resources.style?.push({
    $: { name: 'Dialog.Theme', parent: 'Theme.AppCompat.Light.Dialog' },
    item: [{ _: Colors.light.primary, $: { name: 'colorAccent' } }],
  });

  return styles;
}

export default withCustomStyles;
