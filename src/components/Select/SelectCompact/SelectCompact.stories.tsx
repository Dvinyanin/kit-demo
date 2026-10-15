import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { SelectCompact } from "./SelectCompact";

const ITEMS = [
  { value: "one", label: "Пункт 1" },
  { value: "two", label: "Пункт 2" },
  { value: "three", label: "Пункт 3" },
];

const meta: Meta<typeof SelectCompact> = {
  title: "Components/SelectCompact",
  component: SelectCompact,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("webComponents", "8768-6926"),
    },
  },
  argTypes: {
    fontStyle: { control: { type: "radio" }, options: ["default", "bold"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    fontStyle: "default",
    disabled: false,
    placeholder: "Выберите...",
  },
};

export default meta;

type Story = StoryObj<typeof SelectCompact>;

export const Playground: Story = {
  render(args) {
    const [value, setValue] = useState("");
    return (
      <SelectCompact
        {...args}
        value={value}
        onValueChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? "") : (v ?? ""))}
      >
        {ITEMS.map((item) => (
          <SelectCompact.Item key={item.value} value={item.value}>
            {item.label}
          </SelectCompact.Item>
        ))}
      </SelectCompact>
    );
  },
};

export const Default: Story = {
  name: "Default (placeholder)",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectCompact
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
        placeholder="Выберите..."
      >
        {ITEMS.map((item) => (
          <SelectCompact.Item key={item.value} value={item.value}>
            {item.label}
          </SelectCompact.Item>
        ))}
      </SelectCompact>
    );
  },
};

export const Filled: Story = {
  name: "Filled (value selected)",
  render() {
    const [value, setValue] = useState("two");
    return (
      <SelectCompact value={value} onValueChange={(v) => setValue(v ?? "")}>
        {ITEMS.map((item) => (
          <SelectCompact.Item key={item.value} value={item.value}>
            {item.label}
          </SelectCompact.Item>
        ))}
      </SelectCompact>
    );
  },
};

export const Bold: Story = {
  name: "Bold",
  render() {
    const [value, setValue] = useState("one");
    return (
      <SelectCompact fontStyle="bold" value={value} onValueChange={(v) => setValue(v ?? "")}>
        {ITEMS.map((item) => (
          <SelectCompact.Item key={item.value} value={item.value}>
            {item.label}
          </SelectCompact.Item>
        ))}
      </SelectCompact>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  render() {
    return (
      <SelectCompact disabled defaultValue="one" placeholder="Недоступно">
        {ITEMS.map((item) => (
          <SelectCompact.Item key={item.value} value={item.value}>
            {item.label}
          </SelectCompact.Item>
        ))}
      </SelectCompact>
    );
  },
};

export const WithGroups: Story = {
  name: "With groups",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectCompact
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
        placeholder="Выберите..."
      >
        <SelectCompact.Group label="Группа A">
          <SelectCompact.Item value="a1">Пункт A1</SelectCompact.Item>
          <SelectCompact.Item value="a2">Пункт A2</SelectCompact.Item>
        </SelectCompact.Group>
        <SelectCompact.Separator />
        <SelectCompact.Group label="Группа B">
          <SelectCompact.Item value="b1">Пункт B1</SelectCompact.Item>
          <SelectCompact.Item value="b2">Пункт B2</SelectCompact.Item>
          <SelectCompact.Item value="b3" disabled>
            Пункт B3 (недоступен)
          </SelectCompact.Item>
        </SelectCompact.Group>
      </SelectCompact>
    );
  },
};

export const Open: Story = {
  name: "Open (dropdown demo)",
  parameters: { controls: { disable: true } },
  render() {
    const [value, setValue] = useState("two");
    return (
      <div style={{ paddingBottom: 300 }}>
        <SelectCompact defaultOpen value={value} onValueChange={(v) => setValue(v ?? "")}>
          {ITEMS.map((item) => (
            <SelectCompact.Item key={item.value} value={item.value}>
              {item.label}
            </SelectCompact.Item>
          ))}
        </SelectCompact>
      </div>
    );
  },
};

export const WithIconsInItems: Story = {
  name: "Items with icons",
  render() {
    const [value, setValue] = useState("");
    return (
      <div style={{ paddingBottom: 300 }}>
        <SelectCompact
          defaultOpen
          placeholder="Статус..."
          value={value}
          onValueChange={(v) => setValue(v ?? "")}
        >
          <SelectCompact.Item value="success" iconLeft="status-success-small">
            Успешно
          </SelectCompact.Item>
          <SelectCompact.Item value="warning" iconLeft="status-warning-small">
            Предупреждение
          </SelectCompact.Item>
          <SelectCompact.Item value="error" iconLeft="status-error-small">
            Ошибка
          </SelectCompact.Item>
        </SelectCompact>
      </div>
    );
  },
};

export const MultiSelect: Story = {
  name: "Multi-select (checkboxes)",
  render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div style={{ paddingBottom: 300 }}>
        <SelectCompact
          defaultOpen
          multiple={true}
          placeholder="Выберите..."
          value={values}
          onValueChange={setValues}
        >
          {ITEMS.map((item) => (
            <SelectCompact.MultiSelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectCompact.MultiSelectItem>
          ))}
        </SelectCompact>
      </div>
    );
  },
};

export const NestedGroups: Story = {
  name: "Nested groups",
  render() {
    const [value, setValue] = useState("");
    return (
      <div style={{ paddingBottom: 400 }}>
        <SelectCompact
          defaultOpen
          placeholder="Выберите..."
          value={value}
          onValueChange={(v) => setValue(v ?? "")}
        >
          <SelectCompact.Group label="Группа A">
            <SelectCompact.Item value="a1">Пункт A1</SelectCompact.Item>
            <SelectCompact.NestedGroup label="Подгруппа A1">
              <SelectCompact.Item value="a1-1">Пункт A1.1</SelectCompact.Item>
              <SelectCompact.Item value="a1-2">Пункт A1.2</SelectCompact.Item>
            </SelectCompact.NestedGroup>
            <SelectCompact.Item value="a2">Пункт A2</SelectCompact.Item>
          </SelectCompact.Group>
          <SelectCompact.Separator />
          <SelectCompact.Group label="Группа B">
            <SelectCompact.Item value="b1">Пункт B1</SelectCompact.Item>
            <SelectCompact.NestedGroup label="Подгруппа B1">
              <SelectCompact.Item value="b1-1">Пункт B1.1</SelectCompact.Item>
              <SelectCompact.Item value="b1-2" disabled>
                Пункт B1.2 (недоступен)
              </SelectCompact.Item>
            </SelectCompact.NestedGroup>
          </SelectCompact.Group>
        </SelectCompact>
      </div>
    );
  },
};
