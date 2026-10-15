import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { MultiSelectBase } from "./MultiSelectBase";

const ITEMS = [
  { value: "one", label: "Пункт 1" },
  { value: "two", label: "Пункт 2" },
  { value: "three", label: "Пункт 3" },
  { value: "four", label: "Пункт 4" },
  { value: "five", label: "Пункт 5" },
];

const labelOf = (value: string) => ITEMS.find((item) => item.value === value)?.label ?? value;
const renderMulti = (values: string[]) => values.map(labelOf).join(", ");

const meta: Meta<typeof MultiSelectBase> = {
  title: "Components/MultiSelect/Base",
  component: MultiSelectBase,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("showcase", "3811-37064"),
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelectBase>;

function Items() {
  return (
    <>
      {ITEMS.map((item) => (
        <MultiSelectBase.Item key={item.value} value={item.value}>
          {item.label}
        </MultiSelectBase.Item>
      ))}
    </>
  );
}

export const MultiSelect: Story = {
  name: "Multi-select (checkboxes)",
  render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <MultiSelectBase
        label="Выберите несколько"
        placeholder="Выберите..."
        renderValue={renderMulti}
        value={values}
        onValueChange={setValues}
      >
        {ITEMS.map((item) => (
          <MultiSelectBase.Item key={item.value} value={item.value}>
            {item.label}
          </MultiSelectBase.Item>
        ))}
      </MultiSelectBase>
    );
  },
};

export const MultiSelectWithGroups: Story = {
  name: "Multi-select with groups",
  render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <MultiSelectBase
        label="Разделы"
        placeholder="Выберите разделы..."
        renderValue={(values) => values.map((v) => v.toUpperCase()).join(", ")}
        value={values}
        onValueChange={setValues}
      >
        <MultiSelectBase.Group label="Группа A">
          <MultiSelectBase.Item value="a1">Пункт A1</MultiSelectBase.Item>
          <MultiSelectBase.Item value="a2">Пункт A2</MultiSelectBase.Item>
        </MultiSelectBase.Group>
        <MultiSelectBase.Separator />
        <MultiSelectBase.Group label="Группа B">
          <MultiSelectBase.Item value="b1">Пункт B1</MultiSelectBase.Item>
          <MultiSelectBase.Item value="b2" disabled>
            Пункт B2 (недоступен)
          </MultiSelectBase.Item>
        </MultiSelectBase.Group>
      </MultiSelectBase>
    );
  },
};

export const Clearable: Story = {
  name: "Clearable",
  render() {
    const [values, setValues] = useState<string[]>(["one", "two"]);
    return (
      <MultiSelectBase
        label="Выберите несколько"
        placeholder="Выберите..."
        clearable
        renderValue={renderMulti}
        value={values}
        onValueChange={setValues}
      >
        <Items />
      </MultiSelectBase>
    );
  },
};

export const Micro: Story = {
  name: "Micro size",
  render() {
    const [values, setValues] = useState<string[]>(["one", "two", "three"]);
    return (
      <MultiSelectBase
        size="micro"
        label="Выберите несколько"
        placeholder="Выберите..."
        clearable
        renderValue={renderMulti}
        value={values}
        onValueChange={setValues}
      >
        <Items />
      </MultiSelectBase>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  render() {
    return (
      <MultiSelectBase
        label="Выберите несколько"
        disabled
        renderValue={renderMulti}
        value={["one", "two"]}
      >
        <Items />
      </MultiSelectBase>
    );
  },
};
