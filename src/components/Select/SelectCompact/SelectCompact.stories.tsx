import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { SelectIcon } from "../base/SelectIcon";
import { SelectCompact } from "./SelectCompact";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

const OPTIONS: Option[] = [
  { value: "one", label: "Пункт 1" },
  { value: "two", label: "Пункт 2" },
  { value: "three", label: "Пункт 3" },
  { value: "four", label: "Пункт 4", disabled: true },
];

const getOptionId = (option: Option) => option.value;
const getValueView = (option: Option) => option.label;
const isOptionDisabled = (option: Option) => Boolean(option.disabled);

const meta: Meta<SelectCompact.Props<Option>> = {
  title: "Components/Selects/SelectCompact",
  component: SelectCompact,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("webComponents", "8768-6926"),
    },
  },
  argTypes: {
    // Значение хранит история, а список и функции заданы в args, поэтому в панели Controls их нет
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    options: { table: { disable: true } },
    getOptionId: { table: { disable: true } },
    getValueView: { table: { disable: true } },
    getOptionView: { table: { disable: true } },
    isOptionDisabled: { table: { disable: true } },
    fontStyle: { control: { type: "radio" }, options: ["default", "bold"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    fontStyle: "default",
    disabled: false,
    placeholder: "Выберите...",
    options: OPTIONS,
    getOptionId,
    getValueView,
    isOptionDisabled,
  },
};

export default meta;

type Story = StoryObj<SelectCompact.Props<Option>>;

// Все истории это один компонент с разными аргументами: начальное значение лежит в `args.value`
function Controlled(args: SelectCompact.Props<Option>) {
  const [value, setValue] = useState(args.value);
  return <SelectCompact {...args} value={value} onChange={setValue} />;
}

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
};

export const Filled: Story = {
  name: "Filled (value selected)",
  args: { value: OPTIONS[1] },
  render: (args) => <Controlled {...args} />,
};

export const Bold: Story = {
  name: "Bold",
  args: { fontStyle: "bold", value: OPTIONS[1] },
  render: (args) => <Controlled {...args} />,
};

export const Disabled: Story = {
  name: "Disabled",
  args: { disabled: true, value: OPTIONS[1] },
  render: (args) => <Controlled {...args} />,
};

interface Status {
  value: string;
  label: string;
  icon: "status-success-small" | "status-warning-small" | "status-error-small";
}

const STATUSES: Status[] = [
  { value: "success", label: "Успех", icon: "status-success-small" },
  { value: "warning", label: "Предупреждение", icon: "status-warning-small" },
  { value: "error", label: "Ошибка", icon: "status-error-small" },
];

export const WithIcons: StoryObj = {
  name: "Options with icons",
  parameters: { controls: { disable: true } },
  render() {
    const [value, setValue] = useState<Status | undefined>(STATUSES[0]);
    return (
      <SelectCompact
        placeholder="Выберите..."
        options={STATUSES}
        getOptionId={(status) => status.value}
        getValueView={(status) => status.label}
        getOptionView={(status) => (
          <SelectCompact.OptionContent prefix={<SelectIcon type={status.icon} />}>
            {status.label}
          </SelectCompact.OptionContent>
        )}
        value={value}
        onChange={setValue}
      />
    );
  },
};
