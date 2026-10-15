import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { Select } from "./Select";
import type { SelectOption } from "./Select";

const OPTIONS: SelectOption[] = [
  { value: "one", label: "Пункт 1" },
  { value: "two", label: "Пункт 2" },
  { value: "three", label: "Пункт 3" },
  { value: "four", label: "Пункт 4", disabled: true },
  { value: "five", label: "Пункт 5" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    design: { type: "figma", url: figmaUrl("showcase", "3809-50902") },
  },
  argTypes: {
    size: { control: { type: "radio" }, options: ["default", "micro"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    clearable: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    caption: { control: "text" },
    error: { control: "text" },
  },
  args: {
    size: "default",
    label: "Лейбл",
    placeholder: "Выберите...",
    options: OPTIONS,
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  render(args) {
    const [value, setValue] = useState<string | undefined>("two");
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

export const Micro: Story = {
  render(args) {
    const [value, setValue] = useState<string | undefined>("two");
    return <Select {...args} size="micro" value={value} onChange={setValue} />;
  },
};

export const SubtextSuffixCode: Story = {
  name: "Subtext, suffix, code",
  render() {
    const [value, setValue] = useState<string | undefined>("rub");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 240 }}>
        <Select
          label="Подпись под значением"
          value={value}
          onChange={setValue}
          options={[
            { value: "rub", label: "Рубль", subtext: "RUB" },
            { value: "usd", label: "Доллар", subtext: "USD" },
          ]}
        />
        <Select
          label="Суффикс"
          value={value}
          onChange={setValue}
          options={[
            { value: "rub", label: "Рубль", suffix: "₽" },
            { value: "usd", label: "Доллар", suffix: "$" },
          ]}
        />
        <Select
          label="Код"
          value={value}
          onChange={setValue}
          options={[
            { value: "rub", label: "Рубль", code: "643" },
            { value: "usd", label: "Доллар", code: "840" },
          ]}
        />
      </div>
    );
  },
};

export const IconsAndClear: Story = {
  name: "Icons, suffix, clear",
  render() {
    const [value, setValue] = useState<string | undefined>("one");
    return (
      <Select
        label="Лейбл"
        placeholder="Выберите..."
        iconLeft="filter"
        iconRight="help-circle-filled"
        onIconRightClick={() => undefined}
        iconRightLabel="Подсказка"
        suffix="RUB"
        clearable
        value={value}
        onChange={setValue}
        options={OPTIONS}
      />
    );
  },
};

const STATUSES = [
  { value: "new", label: "Новая", color: "blue" },
  { value: "progress", label: "В процессе", color: "teal" },
  { value: "done", label: "Выполнена", color: "green" },
];

const statusTag = (label: string, color: string) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 6px",
      borderRadius: 4,
      fontSize: 12,
      lineHeight: "16px",
      backgroundColor: `var(--tag-container-${color})`,
      color: `var(--tag-on-container-${color})`,
    }}
  >
    {label}
  </span>
);

export const CustomOption: Story = {
  name: "Custom option (status)",
  render() {
    const [value, setValue] = useState<string | undefined>("progress");
    const colorOf = (v: string) => STATUSES.find((s) => s.value === v)?.color ?? "silver";
    return (
      <Select
        label="Статус"
        value={value}
        onChange={setValue}
        options={STATUSES}
        renderOption={(option) => statusTag(option.label, colorOf(option.value))}
        renderValue={(option) => (option ? statusTag(option.label, colorOf(option.value)) : null)}
      />
    );
  },
};
