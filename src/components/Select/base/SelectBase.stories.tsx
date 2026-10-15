import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { SelectBase } from "./SelectBase";

const ITEMS = [
  { value: "one", label: "Пункт 1" },
  { value: "two", label: "Пункт 2" },
  { value: "three", label: "Пункт 3" },
  { value: "four", label: "Пункт 4" },
  { value: "five", label: "Пункт 5" },
];

const labelOf = (value: string) => ITEMS.find((item) => item.value === value)?.label ?? value;
const renderSingle = (value: string | null) => (value ? labelOf(value) : null);

const meta: Meta<typeof SelectBase> = {
  title: "Components/Select/Base",
  component: SelectBase,
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
    placeholder: "Выберите...",
  },
};

export default meta;

type Story = StoryObj<typeof SelectBase>;

function Items() {
  return (
    <>
      {ITEMS.map((item) => (
        <SelectBase.Item key={item.value} value={item.value}>
          {item.label}
        </SelectBase.Item>
      ))}
    </>
  );
}

export const Playground: Story = {
  render(args) {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        {...args}
        value={value}
        onValueChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? "") : (v ?? ""))}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const OnlyLabel: Story = {
  name: "Only Label",
  render() {
    const [value, setValue] = useState("one");
    return (
      <SelectBase label="Лейбл" value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Items />
      </SelectBase>
    );
  },
};

export const LabelAndText: Story = {
  name: "Label + Text (filled)",
  render() {
    const [value, setValue] = useState("two");
    return (
      <SelectBase label="Лейбл" value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Items />
      </SelectBase>
    );
  },
};

export const OnlyInput: Story = {
  name: "Only Input (no label)",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase placeholder="Выберите..." value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Items />
      </SelectBase>
    );
  },
};

export const LabelAndPlaceholder: Story = {
  name: "Label + Placeholder",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const WithCaption: Story = {
  name: "Caption",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        caption="Подсказка под полем"
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const WithError: Story = {
  name: "Error state",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        error="Обязательное поле"
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const Required: Story = {
  name: "Required",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        required
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const WithIconLeft: Story = {
  name: "Icon left",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        iconLeft="filter"
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const WithIconRight: Story = {
  name: "Icon right",
  render() {
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        iconRight="help-circle-filled"
        onIconRightClick={() => undefined}
        iconRightLabel="Подсказка"
        renderValue={renderSingle}
        value="one"
      >
        <Items />
      </SelectBase>
    );
  },
};

export const WithSuffix: Story = {
  name: "Suffix",
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 240 }}>
        <SelectBase label="Лейбл" suffix="RUB" renderValue={renderSingle} value="one">
          <Items />
        </SelectBase>
        <SelectBase size="micro" label="Лейбл" suffix="RUB" renderValue={renderSingle} value="one">
          <Items />
        </SelectBase>
        <SelectBase label="Лейбл" suffix="RUB" renderValue={renderSingle} value="one" disabled>
          <Items />
        </SelectBase>
      </div>
    );
  },
};

export const Clearable: Story = {
  name: "Clearable",
  render() {
    const [value, setValue] = useState<string | undefined>("two");
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        clearable
        renderValue={renderSingle}
        value={value}
        onValueChange={(v) => setValue(v ?? undefined)}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const IconsAndClear: Story = {
  name: "Icons + clear (micro)",
  render() {
    const [value, setValue] = useState<string | undefined>("one");
    return (
      <SelectBase
        size="micro"
        label="Лейбл"
        placeholder="Выберите..."
        iconLeft="filter"
        iconRight="help-circle-filled"
        onIconRightClick={() => undefined}
        iconRightLabel="Подсказка"
        clearable
        renderValue={renderSingle}
        value={value}
        onValueChange={(v) => setValue(v ?? undefined)}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  render() {
    return (
      <SelectBase label="Лейбл" placeholder="Недоступно" disabled value="one">
        <Items />
      </SelectBase>
    );
  },
};

export const Micro: Story = {
  name: "Micro size",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        size="micro"
        label="Лейбл"
        placeholder="Выберите..."
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <Items />
      </SelectBase>
    );
  },
};

export const States: Story = {
  name: "States overview",
  parameters: { controls: { disable: true } },
  render() {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        <SelectBase
          label="Default"
          placeholder="Выберите..."
          value={value}
          onValueChange={(v) => setValue(v ?? "")}
        >
          <Items />
        </SelectBase>
        <SelectBase label="Filled" value="one">
          <Items />
        </SelectBase>
        <SelectBase label="Disabled" placeholder="Недоступно" disabled value="one">
          <Items />
        </SelectBase>
        <SelectBase
          label="Error"
          placeholder="Выберите..."
          error="Обязательное поле"
          value={value}
          onValueChange={(v) => setValue(v ?? "")}
        >
          <Items />
        </SelectBase>
      </div>
    );
  },
};

export const WithGroups: Story = {
  name: "With groups",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Лейбл"
        placeholder="Выберите..."
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <SelectBase.Group label="Группа A">
          <SelectBase.Item value="a1">Пункт A1</SelectBase.Item>
          <SelectBase.Item value="a2">Пункт A2</SelectBase.Item>
        </SelectBase.Group>
        <SelectBase.Separator />
        <SelectBase.Group label="Группа B">
          <SelectBase.Item value="b1">Пункт B1</SelectBase.Item>
          <SelectBase.Item value="b2">Пункт B2</SelectBase.Item>
          <SelectBase.Item value="b3" disabled>
            Пункт B3 (недоступен)
          </SelectBase.Item>
        </SelectBase.Group>
      </SelectBase>
    );
  },
};

export const WithIconsInItems: Story = {
  name: "Items with icons",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Статус"
        placeholder="Выберите статус..."
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <SelectBase.Item value="success" iconLeft="status-success-small">
          Успешно
        </SelectBase.Item>
        <SelectBase.Item value="warning" iconLeft="status-warning-small">
          Предупреждение
        </SelectBase.Item>
        <SelectBase.Item value="error" iconLeft="status-error-small">
          Ошибка
        </SelectBase.Item>
        <SelectBase.Item value="info" iconLeft="status-info-small">
          Информация
        </SelectBase.Item>
      </SelectBase>
    );
  },
};

export const NestedGroups: Story = {
  name: "Nested groups",
  render() {
    const [value, setValue] = useState("");
    return (
      <SelectBase
        label="Категория"
        placeholder="Выберите..."
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
      >
        <SelectBase.Group label="Группа A">
          <SelectBase.Item value="a1">Пункт A1</SelectBase.Item>
          <SelectBase.NestedGroup label="Подгруппа A1">
            <SelectBase.Item value="a1-1">Пункт A1.1</SelectBase.Item>
            <SelectBase.Item value="a1-2">Пункт A1.2</SelectBase.Item>
          </SelectBase.NestedGroup>
          <SelectBase.Item value="a2">Пункт A2</SelectBase.Item>
        </SelectBase.Group>
        <SelectBase.Separator />
        <SelectBase.Group label="Группа B">
          <SelectBase.Item value="b1">Пункт B1</SelectBase.Item>
          <SelectBase.NestedGroup label="Подгруппа B1">
            <SelectBase.Item value="b1-1">Пункт B1.1</SelectBase.Item>
            <SelectBase.Item value="b1-2" disabled>
              Пункт B1.2 (недоступен)
            </SelectBase.Item>
          </SelectBase.NestedGroup>
        </SelectBase.Group>
      </SelectBase>
    );
  },
};
