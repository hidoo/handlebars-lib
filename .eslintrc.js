module.exports = {
  root: true,
  extends: ['@hidoo/eslint-config'],
  overrides: [
    // for Mocha
    {
      files: ['**/*.test.js'],
      extends: ['@hidoo/eslint-config/+mocha', '@hidoo/eslint-config/+node'],
      rules: {
        'no-empty-function': 'off'
      }
    },
    // for Node
    {
      files: ['**/src/**/*.js'],
      extends: ['@hidoo/eslint-config/+node'],
      rules: {
        'jsdoc/no-defaults': 'off',
        'jsdoc/tag-lines': 'off'
      }
    }
  ]
};
