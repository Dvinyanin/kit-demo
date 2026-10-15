import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser";
import { render } from "vitest-browser-react";

import * as stories from "./Select.stories";

const { Playground, Micro, SubtextSuffixCode, IconsAndClear, CustomOption } =
  composeStories(stories);

// Список выпадает в портал, поэтому снимаем всю страницу, а не контейнер
test("Select: closed with icons, suffix and clear", async () => {
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16, width: 280 }}>
      <IconsAndClear />
    </div>,
  );
  await expect(container).toMatchScreenshot("select-icons-and-clear");
});

test.each([
  ["default", Playground],
  ["micro", Micro],
  ["subtext-suffix-code", SubtextSuffixCode],
  ["custom-option", CustomOption],
])("Select: popup open, %s", async (name, Story) => {
  const screen = await render(
    <div style={{ padding: 16, width: 280 }}>
      <Story />
    </div>,
  );
  await userEvent.click(screen.getByRole("combobox").first());
  await expect(page).toMatchScreenshot(`select-open-${name}`);
});
