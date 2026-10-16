import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";

import * as stories from "./SelectCompact.stories";

const { Playground, Filled, Bold, Disabled } = composeStories(stories);

test.each([
  ["placeholder", Playground],
  ["filled", Filled],
  ["bold", Bold],
  ["disabled", Disabled],
])("SelectCompact: closed, %s", async (name, Story) => {
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16 }}>
      <Story />
    </div>,
  );
  await expect(container).toMatchScreenshot(`select-compact-${name}`);
});
