import globals from "globals";

export const config = {
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": 1,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/comma-dangle": 0,
    "@typescript-eslint/no-unsafe-return": 0,
    "@typescript-eslint/unbound-method": 0,
    "@typescript-eslint/no-unsafe-argument": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/no-shadow": 0,
    "@typescript-eslint/no-explicit-any": 1,
    "function-paren-newline": 0,
    "operator-linebreak": 0,
    "comma-dangle": 1,
    "no-shadow": 0,
    "max-len": 0,
    // indent: [1, 2],
    "object-curly-newline": 0,
    "arrow-body-style": [2, "as-needed"],
    "class-methods-use-this": 0,
    "import/no-webpack-loader-syntax": 0,
    "newline-per-chained-call": 0,
    "default-param-last": 0,
    "no-confusing-arrow": 0,
    "no-console": 1,
    "no-unused-expressions": [
      2,
      {
        allowShortCircuit: true,
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },

      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
    "no-use-before-define": 0,
    "prefer-template": 2,
    "require-yield": 0,
    "no-restricted-imports": [
      "error",
      {
        name: "xxxx",
        message: "xxxxxx",
      },
    ],
  },
};
