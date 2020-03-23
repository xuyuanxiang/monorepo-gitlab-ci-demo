module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  overrides: [
    {
      files: '*.ejs',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
    {
      files: '.vcmrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
