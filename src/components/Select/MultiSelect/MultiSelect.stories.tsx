import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { fieldWidth } from "@/storybook/decorators";
import { figmaUrl } from "@/storybook/figma";

import { MultiSelect } from "./MultiSelect";

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
  { value: "five", label: "Пункт 5" },
];

const getOptionId = (option: Option) => option.value;
const getValueView = (option: Option) => option.label;
const isOptionDisabled = (option: Option) => Boolean(option.disabled);

const meta: Meta<MultiSelect.Props<Option>> = {
  title: "Components/Selects/MultiSelect",
  component: MultiSelect,
  decorators: [fieldWidth()],
  parameters: {
    design: { type: "figma", url: figmaUrl("showcase", "3811-37064") },
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
    size: { control: { type: "radio" }, options: ["default", "micro"] },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    size: "default",
    label: "Выберите несколько",
    placeholder: "Выберите...",
    clearable: true,
    // Начальное значение истории; дальше им управляет состояние внутри render
    value: [OPTIONS[0], OPTIONS[1]],
    options: OPTIONS,
    getOptionId,
    getValueView,
    isOptionDisabled,
  },
};

export default meta;

type Story = StoryObj<MultiSelect.Props<Option>>;

export const Playground: Story = {
  render(args) {
    const [value, setValue] = useState(args.value);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
};
