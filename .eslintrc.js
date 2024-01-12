module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base/legacy'
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "no-underscore-dangle": ["error", { "allow": ["_id"]}],    
    "no-undef": "error",
    strict: 0 // Отключить use strict.
  }
}