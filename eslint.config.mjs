// eslint.config.ts
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * ESLint Flat Config (native) — no FlatCompat.
 *
 * This repo previously relied on legacy preset composition (Next + Prettier) via compat.
 * Moving to native flat-config can surface *more* findings because:
 * - `typescript-eslint` "stylistic"/strict rulesets are opt-in and can be noisy in existing codebases
 * - `@eslint/js` recommended enables core rules that might not have been emitted previously
 *
 * To align closer to the old behavior, we keep the useful baseline checks but disable
 * the newly-introduced/too-strict rules that are currently generating most of the new errors.
 */
export default [
  // Global ignores
  {
    ignores: [
      ".*/**",
      ".agents/**",
      ".next/**",
      "scripts/**",
      "public/**",
      "src/components/ui/**",
      "src/database/migrations/**",
      "src/payload-generated-schema.ts",
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript: keep recommended, but DO NOT pull in stylistic rules (too noisy for existing codebase)
  ...tseslint.configs.recommended,

  // Project-wide language options / globals
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // React / Hooks / Next plugins
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React hooks
      ...reactHooksPlugin.configs.recommended.rules,

      "react-hooks/exhaustive-deps": "off",

      // Disable React Compiler-specific rules contributed by eslint-plugin-react-hooks
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/incompatible-library": "off",
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-render": "off",

      // Next.js recommended rules (plugin ships flat-config presets)
      ...(nextPlugin.configs?.recommended?.rules ?? {}),
      ...(nextPlugin.configs?.["core-web-vitals"]?.rules ?? {}),

      // Soften "new errors" introduced by JS recommended / TS recommended in this repo
      "no-empty": "off",
      "no-empty-pattern": "off",
      "no-extra-boolean-cast": "off",
      "no-useless-assignment": "off",
      "no-constant-binary-expression": "off",
      "no-irregular-whitespace": "off",
      "no-unsafe-optional-chaining": "off",

      // TypeScript rules that are currently generating lots of new errors (disable to match prior setup)
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/array-type": "off",

      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      eqeqeq: ["error", "always"],

      "no-console": [
        "warn",
        {
          allow: ["error", "info", "warn"],
        },
      ],

      "@typescript-eslint/consistent-type-imports": "error",

      "react/display-name": "off",

      // Rule seen in repo output; disable to avoid new failures from the flat-config migration
      "preserve-caught-error": "off",
    },
  },

  // Special-case for generated schema file
  {
    files: ["**/payload-generated-schema.ts"],
    rules: {
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-implicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-empty-interface": "off",
    },
  },

  // Keep Prettier last to disable formatting-related ESLint rules
  eslintConfigPrettier,
];