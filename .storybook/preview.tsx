import "../src/theme";
import type { Preview } from "@storybook/react";

import { IconContext } from "../src/components/Icon";
import { icons } from "../src/icons";

const preview: Preview = {
  initialGlobals: {
    isDarkTheme: false,
    withBackground: false,
  },
  decorators: [
    (Story, context) => {
      const isDarkTheme = context.globals.isDarkTheme ?? false;
      const withBackground = context.globals.withBackground ?? false;
      document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
      document.documentElement.style.backgroundColor = withBackground
        ? "var(--bg-surface-slate)"
        : "var(--bg-page-secondary)";
      return (
        <IconContext.Provider value={icons}>
          <Story />
        </IconContext.Provider>
      );
    },
  ],
  parameters: {
    options: { storySort: { method: "alphabetical" } },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
