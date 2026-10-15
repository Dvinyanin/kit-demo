import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { actionButtonVariants } from "./constants";
import * as stories from "./stories";

const themes = ["light", "dark"] as const;
const cases = themes.flatMap((theme) =>
  actionButtonVariants.map((variant) => [theme, variant] as const),
);

test.each(cases)("ActionButton %s theme, variant %s", async (theme, variant) => {
  const { AllVariants } = composeStories(stories, {
    initialGlobals: { isDarkTheme: theme === "dark", withBackground: variant === "white" },
  });
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16 }}>
      <AllVariants variant={variant} />
    </div>,
  );
  await expect(container).toMatchScreenshot(`action-button-${variant}-${theme}`);
});
