import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { Select } from "./Select";

const meta: Meta = {
  title: "Components/Select",
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("webComponents", "8768-6909"),
    },
  },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render() {
    const [value, setValue] = useState("");
    return (
      <Select.Root value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Select.Trigger>
          <Select.Value placeholder="Выберите..." />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="one">Пункт 1</Select.Item>
          <Select.Item value="two">Пункт 2</Select.Item>
          <Select.Item value="three">Пункт 3</Select.Item>
        </Select.Content>
      </Select.Root>
    );
  },
};

export const WithDefaultValue: Story = {
  render() {
    return (
      <Select.Root defaultValue="two">
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="one">Пункт 1</Select.Item>
          <Select.Item value="two">Пункт 2</Select.Item>
          <Select.Item value="three">Пункт 3</Select.Item>
        </Select.Content>
      </Select.Root>
    );
  },
};

export const Multiple: Story = {
  render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <Select.Root multiple value={values} onValueChange={setValues}>
        <Select.Trigger>
          <Select.Value placeholder="Выберите..." />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="one">Пункт 1</Select.Item>
          <Select.Item value="two">Пункт 2</Select.Item>
          <Select.Item value="three">Пункт 3</Select.Item>
        </Select.Content>
      </Select.Root>
    );
  },
};

export const Disabled: Story = {
  render() {
    return (
      <Select.Root disabled>
        <Select.Trigger>
          <Select.Value placeholder="Недоступно" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="one">Пункт 1</Select.Item>
        </Select.Content>
      </Select.Root>
    );
  },
};
