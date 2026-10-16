import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser";
import { render } from "vitest-browser-react";

import * as stories from "./SelectCells.stories";

// Типы ячеек списка по Showcase; список выпадает в портал, поэтому снимаем всю страницу
test.each(Object.entries(composeStories(stories)))("Select list cells: %s", async (name, Story) => {
  const screen = await render(
    <div style={{ padding: 16 }}>
      <Story />
    </div>,
  );
  await userEvent.click(screen.getByRole("combobox"));
  await expect(page).toMatchScreenshot(`select-list-${name}`);
});
