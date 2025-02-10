module.exports = {
  extends: [
    'react-app',
    'plugin:react/recommended'
  ],
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['dispose', 'geometry', 'material', 'rotation', 'intensity', 'position'] }],
    'react/prop-types': 'off',
    'no-unused-vars': 'warn'
  }
}