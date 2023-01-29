module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 'no-console': 'off',
    'class-methods-use-this': 'off',
    'no-unresolved': 'off',
    'import/first': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
  },
};
