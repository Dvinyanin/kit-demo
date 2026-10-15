import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { MultiSelect } from "./MultiSelect";
import type { MultiSelectOption } from "./MultiSelect";

const OPTIONS: MultiSelectOption[] = [
  { value: "one", label: "Пункт 1" },
  { value: "two", label: "Пункт 2" },
  { value: "three", label: "Пункт 3" },
  { value: "four", label: "Пункт 4", disabled: true },
  { value: "five", label: "Пункт 5" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: {
    design: { type: "figma", url: figmaUrl("showcase", "3811-37064") },
  },
  argTypes: {
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
    options: OPTIONS,
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Playground: Story = {
  render(args) {
    const [value, setValue] = useState<string[] | undefined>(["one", "two"]);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
};

export const Micro: Story = {
  render(args) {
    const [value, setValue] = useState<string[] | undefined>(["one", "two", "three"]);
    return <MultiSelect {...args} size="micro" value={value} onChange={setValue} />;
  },
};

export const Empty: Story = {
  render(args) {
    const [value, setValue] = useState<string[] | undefined>(undefined);
    return <MultiSelect {...args} value={value} onChange={setValue} />;
  },
};
