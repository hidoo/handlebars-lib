import configs from '@hidoo/eslint-config';
import prettierConfigs from '@hidoo/eslint-config/+prettier';
import nodeConfigs from '@hidoo/eslint-config/+node';
import mochaConfigs from '@hidoo/eslint-config/+mocha';

export default [
  ...configs,
  prettierConfigs,
  nodeConfigs,
  {
    rules: {
      'import/no-deprecated': 'warn',
      'n/file-extension-in-import': ['error', 'always'],
      'n/no-unsupported-features/node-builtins': 'warn'
    }
  },

  // for this file
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-anonymous-default-export': 'off'
    }
  },

  // for source files
  {
    files: ['**/src/**/*.js'],
    rules: {
      'jsdoc/no-defaults': 'off',
      'jsdoc/tag-lines': 'off',
      'import/no-deprecated': 'warn'
    }
  },

  // for test files
  {
    files: ['**/*.test.js'],
    ...mochaConfigs
  },
  {
    files: ['**/*.test.js'],
    rules: {
      'no-empty-function': 'off'
    }
  },
  {
    files: ['**/fixtures/**/*.cjs'],
    languageOptions: {
      globals: {
        module: true
      }
    }
  },

  // ignore files
  {
    ignores: [
      'node_modules/*',
      'packages/**/node_modules/*',
      'packages/**/lib/*'
    ]
  }
];
