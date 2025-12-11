import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...ts.configs.recommended,
  // Override default ignores for Chrome extension development.
  globalIgnores([
    "dist/**",
    "node_modules/**",
  ]),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    }
  }
]);

export default eslintConfig;
