import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";
import { useState } from "react";

import { figmaUrl } from "@/storybook/figma";

import { Checkbox } from "./Checkbox";
import { checkboxLabelPositions, checkboxSizes } from "./constants";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("showcase", "1263-7693"),
    },
  },
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    size: { control: { type: "radio" }, options: checkboxSizes },
    labelPosition: { control: { type: "radio" }, options: checkboxLabelPositions },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    invalid: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    size: "medium",
    labelPosition: "right",
    indeterminate: false,
    disabled: false,
    readOnly: false,
    invalid: false,
    children: "Label",
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  render(args) {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} value={checked} onChange={setChecked} />;
  },
};

const cell: CSSProperties = { display: "flex", alignItems: "flex-start", width: 140 };
const header: CSSProperties = {
  width: 140,
  fontSize: 12,
  color: "var(--texticon-secondary)",
};
const rowLabel: CSSProperties = {
  width: 110,
  flexShrink: 0,
  fontSize: 12,
  color: "var(--texticon-secondary)",
  paddingTop: 2,
};

const states = [
  { label: "Default", props: {} },
  { label: "Error", props: { invalid: true } },
  { label: "Disabled", props: { disabled: true } },
] as const;

const values = [
  { label: "Off", props: { value: false } },
  { label: "On", props: { value: true } },
  { label: "Indeterminate", props: { value: false, indeterminate: true } },
] as const;

// Матрица Showcase: значение × состояние (Default, Error, Disabled), затем положение лейбла
export const Overview: Story = {
  name: "Overview",
  parameters: { controls: { include: ["size"] } },
  render({ size }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", gap: 16, paddingLeft: 126 }}>
          {states.map(({ label }) => (
            <div key={label} style={header}>
              {label}
            </div>
          ))}
        </div>
        {values.map((value) => (
          <div key={value.label} style={{ display: "flex", gap: 16 }}>
            <div style={rowLabel}>{value.label}</div>
            {states.map((state) => (
              <div key={state.label} style={cell}>
                <Checkbox size={size} {...value.props} {...state.props}>
                  Label
                </Checkbox>
              </div>
            ))}
          </div>
        ))}
        <div style={{ display: "flex", gap: 16 }}>
          <div style={rowLabel}>Label position</div>
          <div style={cell}>
            <Checkbox size={size} value>
              Right
            </Checkbox>
          </div>
          <div style={cell}>
            <Checkbox size={size} value labelPosition="left">
              Left
            </Checkbox>
          </div>
          {/* Без лейбла корень наследует типографику окружения: задаём её, как в макете */}
          <div
            style={{ ...cell, font: size === "small" ? "var(--body-small)" : "var(--body-large)" }}
          >
            <Checkbox size={size} value aria-label="Without label" />
          </div>
        </div>
      </div>
    );
  },
};

// Рекомендованные интервалы группы по Showcase: вертикально 12, горизонтально 16
export const Grouped: Story = {
  name: "Grouped",
  parameters: { controls: { include: ["size"] } },
  render({ size }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 161 }}>
          <Checkbox size={size} value>
            Label
          </Checkbox>
          <Checkbox size={size}>Label</Checkbox>
          <Checkbox size={size}>Label Label Label Label Label Label Label Label</Checkbox>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <Checkbox size={size} value>
            Label
          </Checkbox>
          <Checkbox size={size}>Label</Checkbox>
          <Checkbox size={size}>Label</Checkbox>
        </div>
      </div>
    );
  },
};
