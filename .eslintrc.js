module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    "jsx-a11y"
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-indent': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-fragments': 0,
    'react/jsx-closing-bracket-location': 0,
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    "jsx-a11y/label-has-associated-control": ["error", {
        "required": {
          "some": ["nesting", "id"]
        }
        }],

  },
};
