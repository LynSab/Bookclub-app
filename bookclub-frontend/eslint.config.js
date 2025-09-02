import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  pluginVue.configs["flat/essential"],
  { 
    files: ["**/*.{js,mjs,cjs,vue}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: { 
      'vue/multi-word-component-names': "off",
      semi: ["error", "always"],
      "comma-dangle": ["error", "never"],
      indent: ["error", 2]
    } 
  }
]);
