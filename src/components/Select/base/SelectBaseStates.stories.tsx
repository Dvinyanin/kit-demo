import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps, ReactNode } from "react";

import { figmaUrl } from "@/storybook/figma";

import { SelectBase } from "./SelectBase";

const meta: Meta<typeof SelectBase> = {
  title: "Components/Select/Base/States",
  component: SelectBase,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("showcase", "3809-50902"),
    },
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof SelectBase>;

const ITEMS = (
  <>
    <SelectBase.Item value="1">Text</SelectBase.Item>
    <SelectBase.Item value="2">Text</SelectBase.Item>
    <SelectBase.Item value="3">Text</SelectBase.Item>
  </>
);

const col: React.CSSProperties = { width: 240 };
const labelCol: React.CSSProperties = {
  width: 80,
  flexShrink: 0,
  fontSize: 12,
  paddingTop: 10,
  color: "var(--texticon-secondary)",
};
const headerCol: React.CSSProperties = {
  width: 240,
  textAlign: "center",
  fontSize: 12,
  color: "var(--texticon-secondary)",
  marginBottom: 4,
};

function StateGrid({
  label,
  placeholder,
  value,
  renderValue,
  extra,
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  renderValue?: (value: string | null) => ReactNode;
  extra?: Partial<ComponentProps<typeof SelectBase>>;
}) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 16, paddingLeft: 96 }}>
        <div style={headerCol}>Default</div>
        <div style={headerCol}>Micro</div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={labelCol}>Default</div>
        <div style={col}>
          <SelectBase
            label={label}
            placeholder={placeholder}
            value={value}
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
        <div style={col}>
          <SelectBase
            size="micro"
            label={label}
            placeholder={placeholder}
            value={value}
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={labelCol}>Error</div>
        <div style={col}>
          <SelectBase
            label={label}
            placeholder={placeholder}
            value={value}
            error="Caption text"
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
        <div style={col}>
          <SelectBase
            size="micro"
            label={label}
            placeholder={placeholder}
            value={value}
            error="Caption text"
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={labelCol}>Disabled</div>
        <div style={col}>
          <SelectBase
            label={label}
            placeholder={placeholder}
            value={value}
            disabled
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
        <div style={col}>
          <SelectBase
            size="micro"
            label={label}
            placeholder={placeholder}
            value={value}
            disabled
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={labelCol}>Read Only</div>
        <div style={col}>
          <SelectBase
            label={label}
            placeholder={placeholder}
            value={value}
            readOnly
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
        <div style={col}>
          <SelectBase
            size="micro"
            label={label}
            placeholder={placeholder}
            value={value}
            readOnly
            renderValue={renderValue}
            {...extra}
          >
            {ITEMS}
          </SelectBase>
        </div>
      </div>
    </div>
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
    return <StateGrid label="Label" value="1" renderValue={() => "Text"} />;
  },
};

export const OnlyInput: Story = {
  name: "Only Input",
  render() {
    return <StateGrid value="1" renderValue={() => "Text"} />;
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
        renderValue={() => "Text"}
        extra={{
          iconLeft: "filter",
          iconRight: "help-circle-filled",
          onIconRightClick: () => undefined,
          iconRightLabel: "Подсказка",
          suffix: "RUB",
          clearable: true,
        }}
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
    return (
      <StateGrid
        label="Label"
        value="1"
        renderValue={() => "Text"}
        extra={{ caption: "Caption text" }}
      />
    );
  },
};
