module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'prettier', 'prettier/react', 'plugin:flowtype/recommended'],
  plugins: ['react', 'prettier', 'eslint-plugin-flowtype'],
  "settings": {
    "react": {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.5.2", // React version, default to the latest React stable release
      "flowVersion": "0.83" // Flow version
    },
    "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  overrides: [
    {
      files: [
        "**/*.test.js"
      ],
      env: {
        jest: true // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight', 'to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/forbid-prop-types': [
      2,
      {
        forbid: ['any'],
      },
    ],
    'react/default-props-match-prop-types': [0],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
          "any": [ "nesting", "id" ]
      },
      "allowChildren": false
  }]
  },
};
