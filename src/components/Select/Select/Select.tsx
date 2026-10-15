import type { ReactNode } from "react";

import type { IIcon } from "../../Icon";
import { SelectBase } from "../base/SelectBase";
import type { SelectBaseProps } from "../base/SelectBase";

export interface SelectOption<Value extends string = string> {
  value: Value;
  label: string;
  subtext?: string;
  suffix?: string;
  code?: string;
  icon?: IIcon;
  disabled?: boolean;
}

export interface SelectProps<Value extends string> extends Omit<
  SelectBaseProps<Value>,
  "children" | "value" | "onValueChange" | "renderValue" | "items"
> {
  /** Selected value. `undefined` means nothing is selected. */
  value?: Value;
  /** Called with the new value, or `undefined` when the selection is cleared. */
  onChange?: (value: Value | undefined) => void;
  options: SelectOption<Value>[];
  /** Custom content of an option in the list (e.g. a status tag). */
  renderOption?: (option: SelectOption<Value>) => ReactNode;
  /** What the trigger shows. Receives the selected option (`undefined` if it is not in `options`). */
  renderValue?: (option: SelectOption<Value> | undefined) => ReactNode;
}

function SelectRoot<Value extends string>({
  value,
  onChange,
  options,
  renderOption,
  renderValue,
  ...fieldProps
}: SelectProps<Value>) {
  return (
    <SelectBase
      {...fieldProps}
      value={value}
      onValueChange={(next) => onChange?.(next ?? undefined)}
      renderValue={(current) => {
        if (current == null) return null;
        const option = options.find((item) => item.value === current);
        return renderValue ? renderValue(option) : (option?.label ?? current);
      }}
    >
      {options.map((option) => (
        <SelectBase.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          iconLeft={option.icon}
          subtext={option.subtext}
          suffix={option.suffix}
          code={option.code}
        >
          {renderOption ? renderOption(option) : option.label}
        </SelectBase.Item>
      ))}
    </SelectBase>
  );
}

export const Select = Object.assign(SelectRoot, { Base: SelectBase });
