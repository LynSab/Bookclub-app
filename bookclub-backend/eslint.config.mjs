import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.jest,
        ...globals.node
      } 
    } 
  },
  { 
    files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" },
    rules: {
      semi: ["error", "always"],
      "comma-dangle": ["error", "never"],
      indent: ["error", 2]
    } 
  },
]);
