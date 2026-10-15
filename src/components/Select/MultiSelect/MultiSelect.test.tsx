import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser";
import { render } from "vitest-browser-react";

import * as stories from "./MultiSelect.stories";

const { Playground, Micro } = composeStories(stories);

// Список выпадает в портал, поэтому снимаем всю страницу, а не контейнер
test.each([
  ["default", Playground],
  ["micro", Micro],
])("MultiSelect: popup open, %s", async (name, Story) => {
  const screen = await render(
    <div style={{ padding: 16, width: 280 }}>
      <Story />
    </div>,
  );
  await userEvent.click(screen.getByRole("combobox"));
  await expect(page).toMatchScreenshot(`multi-select-open-${name}`);
});
