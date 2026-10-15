import type { Meta, StoryObj } from "@storybook/react";

import { figmaUrl } from "@/storybook/figma";

import { SelectBase } from "./SelectBase";

const meta: Meta<typeof SelectBase> = {
  title: "Components/Select/Base/Simple (Single)",
  component: SelectBase,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("showcase", "797-113667"),
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectBase>;

// ─── Value ────────────────────────────────────────────────────────────────────

export const Value: Story = {
  name: "Value",
  render() {
    return (
      <SelectBase label="Label" value="2" renderValue={() => "Value"}>
        <SelectBase.Item value="1">Value</SelectBase.Item>
        <SelectBase.Item value="2">Value</SelectBase.Item>
        <SelectBase.Item value="3">Value</SelectBase.Item>
        <SelectBase.Item value="4">Value</SelectBase.Item>
        <SelectBase.Item value="5">Value</SelectBase.Item>
        <SelectBase.Item value="6">Value</SelectBase.Item>
      </SelectBase>
    );
  },
};

// ─── Value + Subtext ──────────────────────────────────────────────────────────

export const ValueSubtext: Story = {
  name: "Value + Subtext",
  render() {
    return (
      <SelectBase label="Label" value="2" renderValue={() => "Value"}>
        <SelectBase.Item value="1" subtext="Subtext">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="2" subtext="Subtext">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="3" subtext="Subtext">
          Value
        </SelectBase.Item>
      </SelectBase>
    );
  },
};

// ─── Value + Suffix ───────────────────────────────────────────────────────────

export const ValueSuffix: Story = {
  name: "Value + Suffix",
  render() {
    return (
      <SelectBase label="Label" value="2" renderValue={() => "Value Txt"}>
        <SelectBase.Item value="1" suffix="Txt">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="2" suffix="Txt">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="3" suffix="Txt">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="4" suffix="Txt">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="5" suffix="Txt">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="6" suffix="Txt">
          Value
        </SelectBase.Item>
      </SelectBase>
    );
  },
};

// ─── Code + Value ─────────────────────────────────────────────────────────────

export const CodeValue: Story = {
  name: "Code + Value",
  render() {
    return (
      <SelectBase label="Label" value="2" renderValue={() => "00000 · Value"}>
        <SelectBase.Item value="1" code="00000">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="2" code="00000">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="3" code="00000">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="4" code="00000">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="5" code="00000">
          Value
        </SelectBase.Item>
        <SelectBase.Item value="6" code="00000">
          Value
        </SelectBase.Item>
      </SelectBase>
    );
  },
};

// ─── Icon + Value ─────────────────────────────────────────────────────────────

const priorityMap: Record<string, string> = {
  urgent: "Срочный",
  high: "Высокий",
  mid: "Средний",
  low: "Низкий",
  none: "Без приоритета",
};

export const IconValue: Story = {
  name: "Icon + Value",
  render() {
    return (
      <SelectBase
        label="Label"
        value="high"
        renderValue={(v) => (v ? (priorityMap[v] ?? v) : null)}
      >
        <SelectBase.Item value="urgent" iconLeft="priority-urgent">
          Срочный
        </SelectBase.Item>
        <SelectBase.Item value="high" iconLeft="priority-high">
          Высокий
        </SelectBase.Item>
        <SelectBase.Item value="mid" iconLeft="priority-mid">
          Средний
        </SelectBase.Item>
        <SelectBase.Item value="low" iconLeft="priority-low">
          Низкий
        </SelectBase.Item>
        <SelectBase.Item value="none" iconLeft="priority-null">
          Без приоритета
        </SelectBase.Item>
      </SelectBase>
    );
  },
};

// ─── Status ───────────────────────────────────────────────────────────────────

const statusTagStyle = (color: string): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 500,
  backgroundColor: `var(--tag-container-${color})`,
  color: `var(--tag-on-container-${color})`,
});

// Ячейка со статусом: padding 8px 10px, высота 40 при теге 24px
const statusCellStyle = { "--select-cell-padding": "8px 10px" } as React.CSSProperties;

export const Status: Story = {
  name: "Status",
  render() {
    return (
      <SelectBase
        label="Label"
        value="in-progress"
        renderValue={(v) => {
          const map: Record<string, { color: string; label: string }> = {
            new: { color: "blue", label: "Новая" },
            "in-progress": { color: "teal", label: "В процессе" },
            done: { color: "green", label: "Выполнена" },
            draft: { color: "silver", label: "Черновик" },
          };
          const item = v ? map[v] : null;
          return item ? <span style={statusTagStyle(item.color)}>{item.label}</span> : null;
        }}
      >
        <SelectBase.Item value="new" style={statusCellStyle}>
          <span style={statusTagStyle("blue")}>Новая</span>
        </SelectBase.Item>
        <SelectBase.Item value="in-progress" style={statusCellStyle}>
          <span style={statusTagStyle("teal")}>В процессе</span>
        </SelectBase.Item>
        <SelectBase.Item value="done" style={statusCellStyle}>
          <span style={statusTagStyle("green")}>Выполнена</span>
        </SelectBase.Item>
        <SelectBase.Item value="draft" style={statusCellStyle}>
          <span style={statusTagStyle("silver")}>Черновик</span>
        </SelectBase.Item>
      </SelectBase>
    );
  },
};
