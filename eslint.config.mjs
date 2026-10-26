import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**", "out/**", "*.config.*", "pnpm-lock.yaml"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
  {
    // Allow console in API routes and server-side code
    files: ["**/api/**/*.{js,ts}", "**/route.{js,ts}", "**/*.route.{js,ts}"],
    rules: {
      "no-console": "off",
    },
  },
  {
    // Allow console in client components (useful for debugging)
    files: ["**/components/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  }
);

