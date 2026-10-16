import { Select as BaseSelect } from "@base-ui/react/select";
import { isReactNodeNotEmpty } from "@true-engineering/true-react-platform-helpers";
import clsx from "clsx";
import type { MouseEvent, ReactNode } from "react";

import type { IIcon } from "../../Icon";
import { Icon, renderIcon } from "../../Icon";
import { SelectIcon } from "./SelectIcon";

import styles from "./SelectTrigger.module.css";

export interface SelectTriggerProps<Value = unknown> {
  /** Label shown inside the trigger (floats to top when value is selected) */
  label?: string;
  /** Placeholder shown when no value selected and no label */
  placeholder?: string;
  /** Helper text below the field */
  caption?: ReactNode;
  /** Error message below the field (replaces the caption). A non-empty error also turns `invalid` on */
  error?: ReactNode;
  /** Error state of the field (red border and label). By default on when `error` is not empty */
  invalid?: boolean;
  /** Field size */
  size?: "default" | "micro";
  /** Icon inside the trigger on the left: an icon name, or `<Select.Icon … />` for a clickable one */
  iconLeft?: IIcon;
  /** Icon inside the trigger on the right, before the chevron: an icon name, or `<Select.Icon … />` for a clickable one */
  iconRight?: IIcon;
  /** Suffix text (e.g. a currency) inside the trigger, between the right icon and the chevron */
  suffix?: string;
  /** Shows a clear button while a value is selected */
  clearable?: boolean;
  /** Accessible name of the clear button */
  clearLabel?: string;
  /** Not greyed out like disabled: the popup does not open (the root cancels opening) */
  readOnly?: boolean;
  /** What the trigger shows for the selected value (default `String`). Single value only: without a value the placeholder is shown (a multiple select maps its array to a node itself) */
  getValueView?: (value: Value) => ReactNode;
  /** Click on the clear button */
  onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/** Пропсы триггера, которые `Select` и `MultiSelect` принимают как есть. */
export type SelectCommonProps = Pick<
  SelectTriggerProps,
  | "label"
  | "placeholder"
  | "caption"
  | "error"
  | "invalid"
  | "readOnly"
  | "size"
  | "iconLeft"
  | "iconRight"
  | "suffix"
  | "clearable"
  | "clearLabel"
> & {
  /** Shows an orange dot after the label (after the placeholder when there is no label) and marks the field as required */
  required?: boolean;
  disabled?: boolean;
};

/**
 * Триггер селекта: лейбл, значение, иконки, очистка, суффикс и шеврон, а под ним подпись или ошибка.
 * Работает внутри `Select.Root` Base UI (см. `SelectCore`); вид триггера сменный (позже Compact, чипсы).
 */
export function SelectTrigger<Value>({
  label,
  placeholder,
  caption,
  error,
  invalid = isReactNodeNotEmpty(error),
  size = "default",
  iconLeft,
  iconRight,
  suffix,
  clearable,
  clearLabel = "Очистить",
  readOnly,
  getValueView = String,
  onClear,
}: SelectTriggerProps<Value>) {
  // Значение рисуем сами (children у Select.Value побеждает его собственный вывод), поэтому и плейсхолдер для пустого значения отдаём сами
  const renderValue = (current: Value | null) =>
    current == null ? placeholder : getValueView(current);

  const renderBottomText = () => {
    if (isReactNodeNotEmpty(error)) {
      return <p className={styles.errorText}>{error}</p>;
    } else if (isReactNodeNotEmpty(caption)) {
      return <p className={styles.captionText}>{caption}</p>;
    } else {
      return null;
    }
  };

  const triggerClass = clsx(styles.trigger, styles[size], {
    [styles.triggerError]: invalid,
    [styles.triggerReadOnly]: readOnly,
  });

  return (
    <div className={styles.wrapper}>
      {/* Внутри триггера бывают кнопки (очистка, <Select.Icon onClick>), а в <button> они недопустимы, поэтому триггер всегда div */}
      <BaseSelect.Trigger className={triggerClass} render={<div />} nativeButton={false}>
        {iconLeft && <span className={styles.iconSlot}>{renderIcon(iconLeft)}</span>}
        <span className={styles.inputWrapper}>
          <span className={styles.triggerContent}>
            {label && <BaseSelect.Label className={styles.innerLabel}>{label}</BaseSelect.Label>}
            <BaseSelect.Value className={styles.value}>{renderValue}</BaseSelect.Value>
          </span>
          {clearable && (
            <span className={clsx(styles.iconSlot, styles.clear)}>
              <SelectIcon type="clear" onClick={onClear} label={clearLabel} />
            </span>
          )}
        </span>
        {iconRight && <span className={styles.iconSlot}>{renderIcon(iconRight)}</span>}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
        <BaseSelect.Icon className={styles.icon}>
          <Icon type="chevron" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      {renderBottomText()}
    </div>
  );
}
