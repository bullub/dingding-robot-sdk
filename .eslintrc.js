module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "es6": true
  },
  "globals": {
    "it": true,
    "test": true,
    "expect": true,
    "describe": true,
    "beforeEach": true
  },
  "parserOptions": {
    "ecmaVersion": 10
  },
  "extends": [
    "eslint:recommended",
    'plugin:prettier/recommended',
    'prettier',
  ],
  "parser": "babel-eslint",
  "plugins": [
    'prettier'
  ],
  "rules": {
    "prettier/prettier": ["error", { "semi": true, "singleQuote": true }]
  }
};
