import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { textButtonVariants } from "./constants";
import * as stories from "./stories";

const themes = ["light", "dark"] as const;
const cases = themes.flatMap((theme) =>
  textButtonVariants.map((variant) => [theme, variant] as const),
);

test.each(cases)("TextButton %s theme, variant %s", async (theme, variant) => {
  const { AllVariants } = composeStories(stories, {
    initialGlobals: { isDarkTheme: theme === "dark", withBackground: false },
  });
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16 }}>
      <AllVariants variant={variant} />
    </div>,
  );
  await expect(container).toMatchScreenshot(`text-button-${variant}-${theme}`);
});
