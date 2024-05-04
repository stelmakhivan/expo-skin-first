module.exports = {
  root: true,
  extends: ['universe/native'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': ['warn'],
      },
    },
  ],
};
