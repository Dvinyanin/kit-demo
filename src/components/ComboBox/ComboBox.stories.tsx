import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { ComboBox } from "./ComboBox";

const ITEMS = [
  { value: "one", label: "Пункт 1" },
  { value: "two", label: "Пункт 2" },
  { value: "three", label: "Пункт 3" },
  { value: "four", label: "Пункт 4" },
  { value: "five", label: "Пункт 5" },
];

const meta: Meta<typeof ComboBox> = {
  title: "Components/ComboBox",
  component: ComboBox,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("showcase", "515-65606"),
    },
  },
  argTypes: {
    size: { control: { type: "radio" }, options: ["default", "micro"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    caption: { control: "text" },
    error: { control: "text" },
  },
  args: {
    size: "default",
    disabled: false,
    required: false,
    label: "Лейбл",
    placeholder: "Поиск...",
  },
};

export default meta;

type Story = StoryObj<typeof ComboBox>;

function Items() {
  return (
    <>
      {ITEMS.map((item) => (
        <ComboBox.Item key={item.value} value={item.value}>
          {item.label}
        </ComboBox.Item>
      ))}
    </>
  );
}

export const Playground: Story = {
  render(args) {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox
        {...args}
        value={value}
        onValueChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? null) : v)}
      >
        <Items />
      </ComboBox>
    );
  },
};

export const Default: Story = {
  name: "Default (placeholder)",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox label="Лейбл" placeholder="Поиск..." value={value} onValueChange={setValue}>
        <Items />
      </ComboBox>
    );
  },
};

export const Filled: Story = {
  name: "Filled (value selected)",
  render() {
    const [value, setValue] = useState<string | null>("two");
    return (
      <ComboBox label="Лейбл" value={value} onValueChange={setValue}>
        <Items />
      </ComboBox>
    );
  },
};

export const WithCaption: Story = {
  name: "Caption",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox
        label="Лейбл"
        placeholder="Поиск..."
        caption="Подсказка под полем"
        value={value}
        onValueChange={setValue}
      >
        <Items />
      </ComboBox>
    );
  },
};

export const WithError: Story = {
  name: "Error state",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox
        label="Лейбл"
        placeholder="Поиск..."
        error="Обязательное поле"
        value={value}
        onValueChange={setValue}
      >
        <Items />
      </ComboBox>
    );
  },
};

export const Required: Story = {
  name: "Required",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox
        label="Лейбл"
        placeholder="Поиск..."
        required
        value={value}
        onValueChange={setValue}
      >
        <Items />
      </ComboBox>
    );
  },
};

export const WithIconLeft: Story = {
  name: "Icon left",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox
        label="Лейбл"
        placeholder="Поиск..."
        iconLeft="filter"
        value={value}
        onValueChange={setValue}
      >
        <Items />
      </ComboBox>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  render() {
    return (
      <ComboBox label="Лейбл" placeholder="Недоступно" disabled defaultValue="one">
        <Items />
      </ComboBox>
    );
  },
};

export const Micro: Story = {
  name: "Micro size",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox
        size="micro"
        label="Лейбл"
        placeholder="Поиск..."
        value={value}
        onValueChange={setValue}
      >
        <Items />
      </ComboBox>
    );
  },
};

export const WithGroups: Story = {
  name: "With groups",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox label="Лейбл" placeholder="Поиск..." value={value} onValueChange={setValue}>
        <ComboBox.Group label="Группа A">
          <ComboBox.Item value="a1">Пункт A1</ComboBox.Item>
          <ComboBox.Item value="a2">Пункт A2</ComboBox.Item>
        </ComboBox.Group>
        <ComboBox.Separator />
        <ComboBox.Group label="Группа B">
          <ComboBox.Item value="b1">Пункт B1</ComboBox.Item>
          <ComboBox.Item value="b2">Пункт B2</ComboBox.Item>
          <ComboBox.Item value="b3" disabled>
            Пункт B3 (недоступен)
          </ComboBox.Item>
        </ComboBox.Group>
      </ComboBox>
    );
  },
};

export const WithIconsInItems: Story = {
  name: "Items with icons",
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <ComboBox
        label="Статус"
        placeholder="Поиск статуса..."
        value={value}
        onValueChange={setValue}
      >
        <ComboBox.Item value="success" iconLeft="status-success-small">
          Успешно
        </ComboBox.Item>
        <ComboBox.Item value="warning" iconLeft="status-warning-small">
          Предупреждение
        </ComboBox.Item>
        <ComboBox.Item value="error" iconLeft="status-error-small">
          Ошибка
        </ComboBox.Item>
        <ComboBox.Item value="info" iconLeft="status-info-small">
          Информация
        </ComboBox.Item>
      </ComboBox>
    );
  },
};

export const MultiSelect: Story = {
  name: "Multi-select (chips)",
  render() {
    const [values, setValues] = useState<string[]>([]);
    const labelMap: Record<string, string> = Object.fromEntries(
      ITEMS.map((i) => [i.value, i.label]),
    );
    return (
      <ComboBox.Multi
        label="Выберите несколько"
        placeholder="Поиск..."
        value={values}
        onValueChange={setValues}
        getChipLabel={(v) => labelMap[v] ?? v}
      >
        {ITEMS.map((item) => (
          <ComboBox.Multi.MultiSelectItem key={item.value} value={item.value}>
            {item.label}
          </ComboBox.Multi.MultiSelectItem>
        ))}
      </ComboBox.Multi>
    );
  },
};

export const States: Story = {
  name: "States overview",
  parameters: { controls: { disable: true } },
  render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        <ComboBox label="Default" placeholder="Поиск..." value={value} onValueChange={setValue}>
          <Items />
        </ComboBox>
        <ComboBox label="Filled" defaultValue="one">
          <Items />
        </ComboBox>
        <ComboBox label="Disabled" placeholder="Недоступно" disabled defaultValue="one">
          <Items />
        </ComboBox>
        <ComboBox
          label="Error"
          placeholder="Поиск..."
          error="Обязательное поле"
          value={value}
          onValueChange={setValue}
        >
          <Items />
        </ComboBox>
      </div>
    );
  },
};
