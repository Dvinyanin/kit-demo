import { composeStories } from "@storybook/react";
import type { ReactNode } from "react";
import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser";
import { render } from "vitest-browser-react";

import { Select } from "./Select";
import * as stories from "./Select.stories";

const { Playground, OptionContent, IconsAndClear, CustomOption } = composeStories(stories);

// Список выпадает в портал, поэтому снимаем всю страницу, а не контейнер
test("Select: closed with icons, suffix and clear", async () => {
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16 }}>
      <IconsAndClear />
    </div>,
  );
  await expect(container).toMatchScreenshot("select-icons-and-clear");
});

const openCases: [string, () => ReactNode][] = [
  ["default", () => <Playground />],
  ["micro", () => <Playground size="micro" />],
  ["option-content", () => <OptionContent />],
  ["custom-option", () => <CustomOption />],
];

test.each(openCases)("Select: popup open, %s", async (name, renderStory) => {
  const screen = await render(<div style={{ padding: 16 }}>{renderStory()}</div>);
  await userEvent.click(screen.getByRole("combobox").first());
  await expect(page).toMatchScreenshot(`select-open-${name}`);
});

const options = ["Пункт 1", "Пункт 2"];

test("Select: Read Only does not open and does not change the value", async () => {
  const onChange = vi.fn();
  const screen = await render(
    <Select label="Лейбл" value="Пункт 1" onChange={onChange} options={options} readOnly />,
  );
  const trigger = screen.getByRole("combobox");
  await trigger.click();
  await userEvent.keyboard("{ArrowDown}");
  await userEvent.keyboard("{Enter}");
  await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
  expect(onChange).not.toHaveBeenCalled();
});

test("Select: clearing calls onChange(undefined) and does not open the popup", async () => {
  const onChange = vi.fn();
  const screen = await render(
    <Select label="Лейбл" value="Пункт 1" onChange={onChange} options={options} clearable />,
  );
  await screen.getByRole("button", { name: "Очистить" }).click();
  expect(onChange).toHaveBeenCalledWith(undefined);
  await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
});
