import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-designs", "@storybook/addon-mcp"],
  framework: "@storybook/react-vite",
  features: {
    componentsManifest: true,
  },
};

export default config;
