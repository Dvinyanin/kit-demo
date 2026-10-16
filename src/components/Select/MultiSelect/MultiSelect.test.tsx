import { composeStories } from "@storybook/react";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser";
import { render } from "vitest-browser-react";

import * as stories from "./MultiSelect.stories";

const { Playground } = composeStories(stories);

// Список выпадает в портал, поэтому снимаем всю страницу, а не контейнер
test.each([
  ["default", {}],
  ["micro", { size: "micro" }],
] as const)("MultiSelect: popup open, %s", async (name, props) => {
  const screen = await render(
    <div style={{ padding: 16 }}>
      <Playground {...props} />
    </div>,
  );
  await userEvent.click(screen.getByRole("combobox"));
  await expect(page).toMatchScreenshot(`multi-select-open-${name}`);
});

test("MultiSelect: empty selection shows the placeholder", async () => {
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16 }}>
      <Playground value={[]} />
    </div>,
  );
  await expect(container).toMatchScreenshot("multi-select-empty");
});
