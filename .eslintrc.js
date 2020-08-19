module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'comma-dangle': ['warn', 'always-multiline'],
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 'warn',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
};
