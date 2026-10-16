import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { figmaUrl } from "@/storybook/figma";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Selects/Select/States",
  component: Select,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("showcase", "3809-50902"),
    },
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

type FieldProps = Partial<Select.Props<string>>;

const OPTIONS = ["1", "2", "3"];

const col: CSSProperties = { width: 240 };
const labelCol: CSSProperties = {
  width: 80,
  flexShrink: 0,
  fontSize: 12,
  paddingTop: 10,
  color: "var(--texticon-secondary)",
};
const headerCol: CSSProperties = {
  width: 240,
  textAlign: "center",
  fontSize: 12,
  color: "var(--texticon-secondary)",
  marginBottom: 4,
};

function Field(props: FieldProps) {
  return <Select options={OPTIONS} getValueView={() => "Text"} {...props} />;
}

// Сетка секции Showcase: строки состояний, колонки Default и Micro
function Grid({ rows }: { rows: { label: string; props: FieldProps }[] }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 16, paddingLeft: 96 }}>
        <div style={headerCol}>Default</div>
        <div style={headerCol}>Micro</div>
      </div>
      {rows.map(({ label, props }) => (
        <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={labelCol}>{label}</div>
          <div style={col}>
            <Field {...props} />
          </div>
          <div style={col}>
            <Field size="micro" {...props} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Статические состояния: Default, Error, Disabled, Read Only
function StateGrid(props: FieldProps) {
  return (
    <Grid
      rows={[
        { label: "Default", props },
        { label: "Error", props: { ...props, error: "Caption text" } },
        { label: "Disabled", props: { ...props, disabled: true } },
        { label: "Read Only", props: { ...props, readOnly: true } },
      ]}
    />
  );
}

export const OnlyLabel: Story = {
  name: "Only Label",
  render() {
    return <StateGrid label="Label" />;
  },
};

export const LabelAndInput: Story = {
  name: "Label + Input",
  render() {
    return <StateGrid label="Label" value="1" />;
  },
};

export const OnlyInput: Story = {
  name: "Only Input",
  render() {
    return <StateGrid value="1" />;
  },
};

export const LabelAndPlaceholder: Story = {
  name: "Label + Placeholder",
  render() {
    return <StateGrid label="Label" placeholder="Placeholder" />;
  },
};

export const OnlyPlaceholder: Story = {
  name: "Only Placeholder",
  render() {
    return <StateGrid placeholder="Placeholder" />;
  },
};

export const AllSlots: Story = {
  name: "All slots",
  render() {
    return (
      <StateGrid
        label="Label"
        value="1"
        iconLeft="filter"
        iconRight={
          <Select.Icon type="help-circle-filled" onClick={() => undefined} label="Подсказка" />
        }
        suffix="RUB"
        clearable
      />
    );
  },
};

export const Caption: Story = {
  name: "Caption",
  parameters: {
    design: { type: "figma", url: figmaUrl("showcase", "3809-51461") },
  },
  render() {
    return <StateGrid label="Label" value="1" caption="Caption text" />;
  },
};

// Секция Required в Showcase: четыре сочетания содержимого, светлая тема
export const Required: Story = {
  name: "Required",
  parameters: {
    design: { type: "figma", url: figmaUrl("showcase", "3809-51487") },
  },
  render() {
    return (
      <Grid
        rows={[
          { label: "Only Label", props: { required: true, label: "Label" } },
          { label: "Label + Input", props: { required: true, label: "Label", value: "1" } },
          {
            label: "Label + Placeholder",
            props: { required: true, label: "Label", placeholder: "Placeholder" },
          },
          { label: "Only Placeholder", props: { required: true, placeholder: "Placeholder" } },
        ]}
      />
    );
  },
};
