module.exports = {
  'root': true,
  'extends': [
    '@hidoo/eslint-config',
    '@hidoo/eslint-config/+babel'
  ],
  'overrides': [
    // for Mocha
    {
      'files': [
        '**/*.test.js'
      ],
      'extends': [
        '@hidoo/eslint-config/+mocha'
      ],
      'rules': {
        'no-empty-function': 'off',
        'mocha/no-hooks-for-single-case': 'off'
      }
    },
    // for Node
    {
      'files': [
        '**/src/**/*.js',
      ],
      'extends': [
        '@hidoo/eslint-config/+node'
      ]
    }
  ]
};
