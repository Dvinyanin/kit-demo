import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";

import * as stories from "./SelectBaseStates.stories";

test.each(Object.entries(composeStories(stories)))("Select states: %s", async (name, Story) => {
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16 }}>
      <Story />
    </div>,
  );
  await expect(container).toMatchScreenshot(`select-states-${name}`);
});
