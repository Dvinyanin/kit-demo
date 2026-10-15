import type { ReactNode } from "react";

import type { IIcon } from "../../Icon";
import { MultiSelectBase } from "../base/MultiSelectBase";
import type { MultiSelectBaseProps } from "../base/MultiSelectBase";

export interface MultiSelectOption<Value extends string = string> {
  value: Value;
  label: string;
  icon?: IIcon;
  disabled?: boolean;
}

export interface MultiSelectProps<Value extends string> extends Omit<
  MultiSelectBaseProps<Value>,
  "children" | "value" | "onValueChange" | "renderValue" | "items"
> {
  /** Selected values. `undefined` means nothing is selected. */
  value?: Value[];
  /** Called with the new values (an empty array when the selection is cleared). */
  onChange?: (value: Value[]) => void;
  options: MultiSelectOption<Value>[];
  /** What the trigger shows. Receives the selected options found in `options`. Default: labels joined by commas. */
  renderValue?: (options: MultiSelectOption<Value>[]) => ReactNode;
}

function MultiSelectRoot<Value extends string>({
  value,
  onChange,
  options,
  renderValue,
  ...fieldProps
}: MultiSelectProps<Value>) {
  return (
    <MultiSelectBase
      {...fieldProps}
      value={value}
      onValueChange={(next) => onChange?.(next)}
      renderValue={(current) => {
        if (current.length === 0) return null;
        const selected = current.flatMap(
          (item) => options.find((option) => option.value === item) ?? [],
        );
        return renderValue
          ? renderValue(selected)
          : selected.map((option) => option.label).join(", ");
      }}
    >
      {options.map((option) => (
        <MultiSelectBase.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          iconLeft={option.icon}
        >
          {option.label}
        </MultiSelectBase.Item>
      ))}
    </MultiSelectBase>
  );
}

export const MultiSelect = Object.assign(MultiSelectRoot, { Base: MultiSelectBase });
