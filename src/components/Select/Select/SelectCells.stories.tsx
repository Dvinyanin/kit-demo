import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";

import { fieldWidth } from "@/storybook/decorators";
import { figmaUrl } from "@/storybook/figma";

import { SelectCore } from "../base/SelectCore";
import { SelectItem } from "../base/SelectItem";
import { SelectPopup } from "../base/SelectPopup";
import { SelectTrigger } from "../base/SelectTrigger";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Selects/Select/Cells",
  component: Select,
  decorators: [fieldWidth()],
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("showcase", "797-113667"),
    },
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const OPTIONS = ["1", "2", "3", "4", "5", "6"];

// ─── Value ────────────────────────────────────────────────────────────────────

export const Value: Story = {
  name: "Value",
  render() {
    return <Select label="Label" options={OPTIONS} value="2" getValueView={() => "Value"} />;
  },
};

// ─── Value + Subtext ──────────────────────────────────────────────────────────

export const ValueSubtext: Story = {
  name: "Value + Subtext",
  render() {
    return (
      <Select
        label="Label"
        options={OPTIONS.slice(0, 3)}
        value="2"
        getValueView={() => "Value"}
        getOptionView={() => <Select.OptionContent subtext="Subtext">Value</Select.OptionContent>}
      />
    );
  },
};

// ─── Value + Suffix ───────────────────────────────────────────────────────────

export const ValueSuffix: Story = {
  name: "Value + Suffix",
  render() {
    return (
      <Select
        label="Label"
        options={OPTIONS}
        value="2"
        getValueView={() => "Value Txt"}
        getOptionView={() => <Select.OptionContent suffix="Txt">Value</Select.OptionContent>}
      />
    );
  },
};

// ─── Code + Value ─────────────────────────────────────────────────────────────

export const CodeValue: Story = {
  name: "Code + Value",
  render() {
    return (
      <Select
        label="Label"
        options={OPTIONS}
        value="2"
        getValueView={() => "00000 · Value"}
        getOptionView={() => <Select.OptionContent prefix="00000">Value</Select.OptionContent>}
      />
    );
  },
};

// ─── Icon + Value ─────────────────────────────────────────────────────────────

interface Priority {
  id: string;
  label: string;
  icon: "priority-urgent" | "priority-high" | "priority-mid" | "priority-low" | "priority-null";
}

const PRIORITIES: Priority[] = [
  { id: "urgent", label: "Срочный", icon: "priority-urgent" },
  { id: "high", label: "Высокий", icon: "priority-high" },
  { id: "mid", label: "Средний", icon: "priority-mid" },
  { id: "low", label: "Низкий", icon: "priority-low" },
  { id: "none", label: "Без приоритета", icon: "priority-null" },
];

export const IconValue: Story = {
  name: "Icon + Value",
  render() {
    return (
      <Select
        label="Label"
        options={PRIORITIES}
        value={PRIORITIES[1]}
        getOptionId={(priority) => priority.id}
        getValueView={(priority) => priority.label}
        getOptionView={(priority) => (
          <Select.OptionContent prefix={<Select.Icon type={priority.icon} />}>
            {priority.label}
          </Select.OptionContent>
        )}
      />
    );
  },
};

// ─── Status ───────────────────────────────────────────────────────────────────

interface Status {
  id: string;
  color: string;
  label: string;
}

const STATUSES: Status[] = [
  { id: "new", color: "blue", label: "Новая" },
  { id: "in-progress", color: "teal", label: "В процессе" },
  { id: "done", color: "green", label: "Выполнена" },
  { id: "draft", color: "silver", label: "Черновик" },
];

const statusTagStyle = (color: string): CSSProperties => ({
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

// Ячейка со статусом: padding 8px 10px, высота 40 при теге 24px. Отступы ячейки меняются через `style`,
// а `Select` отдаёт наружу только содержимое ячейки, поэтому здесь собираем из частей: SelectCore + Item
const statusCellStyle = { "--select-cell-padding": "8px 10px" } as CSSProperties;

export const Status: Story = {
  name: "Status",
  render() {
    return (
      <SelectCore<Status>
        value={STATUSES[1]}
        isItemEqualToValue={(a, b) => a.id === b.id}
        renderTrigger={() => (
          <SelectTrigger<Status>
            label="Label"
            getValueView={(status) => (
              <span style={statusTagStyle(status.color)}>{status.label}</span>
            )}
          />
        )}
      >
        <SelectPopup>
          {STATUSES.map((status) => (
            <SelectItem key={status.id} value={status} style={statusCellStyle}>
              <span style={statusTagStyle(status.color)}>{status.label}</span>
            </SelectItem>
          ))}
        </SelectPopup>
      </SelectCore>
    );
  },
};
