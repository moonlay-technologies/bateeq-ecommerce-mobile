module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    'prettier',
    // 'eslint-plugin-prettier'
    // 'jsx-ally',
    // 'import'
  ],
  parser: '@babel/eslint-parser',
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'prettier/prettier': 2,
    'no-nested-ternary': [0],
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-use-before-define': [2, { functions: false, variables: false }],
    'react/jsx-filename-extension': 2,
    'react/prop-types': [0],
    'linebreak-style': ['error', 'windows'],
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    // 'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    // 'no-unstable-nested-component': false,
    // 'no-inline-styles': false,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
  },
  globals: {
    fetch: false,
  },
};
