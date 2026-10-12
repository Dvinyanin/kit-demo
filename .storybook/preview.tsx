import "../src/theme";
import type { Preview } from "@storybook/react";

import { IconContext } from "../src/components/Icon";
import { icons } from "../src/icons";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.style.backgroundColor = theme === "dark" ? "#141414" : "";
      return (
        <IconContext.Provider value={icons}>
          <Story />
        </IconContext.Provider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
