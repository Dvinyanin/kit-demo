import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { fieldWidth } from "@/storybook/decorators";
import { figmaUrl } from "@/storybook/figma";

import { Select } from "./Select";

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

// Значение поля — сам элемент списка, поэтому для объектов нужны функции: id, вид в триггере, недоступность
const getOptionId = (option: Option) => option.value;
const getValueView = (option: Option) => option.label;
const isOptionDisabled = (option: Option) => Boolean(option.disabled);

const meta: Meta<Select.Props<Option>> = {
  title: "Components/Selects/Select",
  component: Select,
  decorators: [fieldWidth()],
  parameters: {
    design: { type: "figma", url: figmaUrl("showcase", "3809-50902") },
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
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    clearable: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    caption: { control: "text" },
    error: { control: "text" },
    invalid: { control: "boolean" },
  },
  args: {
    size: "default",
    label: "Лейбл",
    placeholder: "Выберите...",
    // Начальное значение истории; дальше им управляет состояние внутри render
    value: OPTIONS[1],
    options: OPTIONS,
    getOptionId,
    getValueView,
    isOptionDisabled,
  },
};

export default meta;

type Story = StoryObj<Select.Props<Option>>;

export const Playground: Story = {
  render(args) {
    const [value, setValue] = useState(args.value);
    return <Select {...args} value={value} onChange={setValue} />;
  },
};

export const Strings: StoryObj = {
  name: "Strings (no functions needed)",
  parameters: { controls: { disable: true } },
  render() {
    const [value, setValue] = useState<string | undefined>("Казань");
    return (
      <Select
        label="Город"
        placeholder="Выберите..."
        options={["Москва", "Казань", "Новосибирск"]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

interface Currency {
  code: string;
  name: string;
  symbol: string;
  numeric: string;
}

const CURRENCIES: Currency[] = [
  { code: "RUB", name: "Рубль", symbol: "₽", numeric: "643" },
  { code: "USD", name: "Доллар", symbol: "$", numeric: "840" },
];

const currencyAccessors = {
  getOptionId: (currency: Currency) => currency.code,
  getValueView: (currency: Currency) => currency.name,
};

export const OptionContent: StoryObj = {
  name: "Option content: subtext, suffix, prefix",
  parameters: { controls: { disable: true } },
  render() {
    const [value, setValue] = useState<Currency | undefined>(CURRENCIES[0]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select
          label="Подпись под значением"
          {...currencyAccessors}
          options={CURRENCIES}
          value={value}
          onChange={setValue}
          getOptionView={(currency) => (
            <Select.OptionContent subtext={currency.code}>{currency.name}</Select.OptionContent>
          )}
        />
        <Select
          label="Суффикс"
          {...currencyAccessors}
          options={CURRENCIES}
          value={value}
          onChange={setValue}
          getOptionView={(currency) => (
            <Select.OptionContent suffix={currency.symbol}>{currency.name}</Select.OptionContent>
          )}
        />
        <Select
          label="Код"
          {...currencyAccessors}
          options={CURRENCIES}
          value={value}
          onChange={setValue}
          getOptionView={(currency) => (
            <Select.OptionContent prefix={currency.numeric}>{currency.name}</Select.OptionContent>
          )}
        />
        <Select
          label="Иконка"
          {...currencyAccessors}
          options={CURRENCIES}
          value={value}
          onChange={setValue}
          getOptionView={(currency) => (
            <Select.OptionContent prefix={<Select.Icon type="filter" />}>
              {currency.name}
            </Select.OptionContent>
          )}
        />
      </div>
    );
  },
};

export const IconsAndClear: Story = {
  name: "Icons, suffix, clear",
  render() {
    const [value, setValue] = useState<Option | undefined>(OPTIONS[0]);
    return (
      <Select
        label="Лейбл"
        placeholder="Выберите..."
        iconLeft="filter"
        iconRight={
          <Select.Icon type="help-circle-filled" onClick={() => undefined} label="Подсказка" />
        }
        suffix="RUB"
        clearable
        value={value}
        onChange={setValue}
        options={OPTIONS}
        getOptionId={getOptionId}
        getValueView={getValueView}
      />
    );
  },
};

interface Status {
  value: string;
  label: string;
  color: string;
}

const STATUSES: Status[] = [
  { value: "new", label: "Новая", color: "blue" },
  { value: "progress", label: "В процессе", color: "teal" },
  { value: "done", label: "Выполнена", color: "green" },
];

const statusTag = (status: Status) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 6px",
      borderRadius: 4,
      fontSize: 12,
      lineHeight: "16px",
      backgroundColor: `var(--tag-container-${status.color})`,
      color: `var(--tag-on-container-${status.color})`,
    }}
  >
    {status.label}
  </span>
);

// Задан только getValueView: тег показывается и в триггере, и в списке
export const CustomOption: StoryObj = {
  name: "Custom option (status)",
  parameters: { controls: { disable: true } },
  render() {
    const [value, setValue] = useState<Status | undefined>(STATUSES[1]);
    return (
      <Select
        label="Статус"
        options={STATUSES}
        getOptionId={(status) => status.value}
        getValueView={statusTag}
        value={value}
        onChange={setValue}
      />
    );
  },
};
