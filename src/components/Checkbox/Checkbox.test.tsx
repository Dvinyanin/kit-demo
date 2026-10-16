import { composeStories } from "@storybook/react";
import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser";
import { render } from "vitest-browser-react";

import { Checkbox } from "./Checkbox";
import { checkboxSizes } from "./constants";
import * as stories from "./stories";

const themes = ["light", "dark"] as const;
const cases = themes.flatMap((theme) => checkboxSizes.map((size) => [theme, size] as const));

test.each(cases)("Checkbox %s theme, size %s", async (theme, size) => {
  const { Overview, Grouped } = composeStories(stories, {
    initialGlobals: { isDarkTheme: theme === "dark" },
  });
  const { container } = await render(
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 24, padding: 16 }}>
      <Overview size={size} />
      <Grouped size={size} />
    </div>,
  );
  await expect(container).toMatchScreenshot(`checkbox-${size}-${theme}`);
});

// Hover снимаем отдельно: курсор находится на лейбле, подсвечивается коробка
test.each([
  ["off", { value: false }],
  ["on", { value: true }],
  ["indeterminate", { value: false, indeterminate: true }],
  ["off-error", { value: false, invalid: true }],
] as const)("Checkbox hover, %s", async (name, props) => {
  // Темой управляет декоратор историй; здесь историй нет, поэтому светлую тему задаём сами
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.style.backgroundColor = "var(--bg-page-secondary)";
  const { container } = await render(
    <div style={{ display: "inline-block", padding: 16 }}>
      <Checkbox {...props}>Label</Checkbox>
    </div>,
  );
  await userEvent.hover(page.getByText("Label"));
  await expect(container).toMatchScreenshot(`checkbox-hover-${name}`);
});

test("Checkbox: click on the label toggles the value", async () => {
  const onChange = vi.fn();
  const screen = await render(
    <Checkbox value={false} onChange={onChange}>
      Label
    </Checkbox>,
  );
  await screen.getByText("Label").click();
  expect(onChange).toHaveBeenCalledWith(true);
});

test("Checkbox: disabled does not change the value", async () => {
  const onChange = vi.fn();
  const screen = await render(
    <Checkbox value={false} disabled onChange={onChange}>
      Label
    </Checkbox>,
  );
  await screen.getByText("Label").click({ force: true });
  expect(onChange).not.toHaveBeenCalled();
});

// Read Only не реагирует на мышь (pointer-events: none), поэтому проверяем клавиатуру
test("Checkbox: read only does not change the value", async () => {
  const onChange = vi.fn();
  const screen = await render(
    <Checkbox value={false} readOnly onChange={onChange}>
      Label
    </Checkbox>,
  );
  (screen.getByRole("checkbox").element() as HTMLElement).focus();
  await userEvent.keyboard(" ");
  expect(onChange).not.toHaveBeenCalled();
});

test("Checkbox: indeterminate is exposed as mixed", async () => {
  const screen = await render(
    <Checkbox value={false} indeterminate>
      Label
    </Checkbox>,
  );
  await expect.element(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
});
