// src/config.js or similar
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

// --- New imports for JSON, YAML, and Markdown ---
import eslintPluginJsonc from "eslint-plugin-jsonc";
import eslintPluginYml from "eslint-plugin-yml";
import markdown from "eslint-plugin-markdown";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
      markdown,
    },
  },

  // --- ADDED: JSON/C configuration ---
  {
    files: ["**/*.json", "**/*.jsonc"],
    // This applies the recommended parser and rules for JSON.
    ...eslintPluginJsonc.configs["recommended-with-jsonc"],
  },

  // --- ADDED: YAML configuration ---
  {
    files: ["**/*.{yml,yaml}"],
    // This applies the standard parser and rules for YAML.
    ...eslintPluginYml.configs["standard"],
  },

  // --- ADDED: Markdown configuration (in two parts) ---
  // 1. This tells ESLint to process code blocks within Markdown files.
  {
    files: ["**/*.md"],
    processor: "markdown/markdown",
  },
  // 2. This configures rules for the code blocks found in Markdown.
  {
    files: ["**/*.md/*.{js,ts,json,yml}"],
    // It's common to disable rules that are noisy in documentation.
    rules: {
      "no-unused-vars": "off",
      "no-console": 1,
      "import/no-unresolved": "off",
      "turbo/no-undeclared-env-vars": "off",
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
      "arrow-body-style": [2, "as-needed"],
      "class-methods-use-this": 0,
      "import/no-webpack-loader-syntax": 0,
      "newline-per-chained-call": 0,
      "default-param-last": 0,
      "no-confusing-arrow": 0,
      "object-curly-newline": 0,
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
    },
  },

  // Global ignores should usually be last
  {
    ignores: ["dist/**"],
  },
];
