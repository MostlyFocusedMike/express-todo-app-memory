module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'consistent-return': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '_', destructuredArrayIgnorePattern: '^_' },
    ],
  },
  globals: {
    jest: ['describe', 'it', 'expect', 'beforeEach', 'afterEach'],
  },
};
