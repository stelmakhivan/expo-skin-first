module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:react-hooks/recommended'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': ['warn'],
      },
    },
  ],
};
