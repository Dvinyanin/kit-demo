import { Select as BaseSelect } from "@base-ui/react/select";
import clsx from "clsx";
import type { ReactNode } from "react";

import { Icon } from "../../Icon";

import styles from "./SelectCompactTrigger.module.css";

export interface SelectCompactTriggerProps<Value = unknown> {
  placeholder?: string;
  fontStyle?: "default" | "bold";
  /** What the trigger shows for the selected value (default `String`). Without a value the placeholder is shown */
  getValueView?: (value: Value) => ReactNode;
}

/** Компактный триггер селекта: текст и шеврон без рамки. Работает внутри `Select.Root` Base UI (см. `SelectCore`). */
export function SelectCompactTrigger<Value>({
  placeholder,
  fontStyle = "default",
  getValueView = String,
}: SelectCompactTriggerProps<Value>) {
  const triggerClass = clsx(styles.trigger, { [styles.triggerBold]: fontStyle === "bold" });

  // Значение рисуем сами (children у Select.Value побеждает его собственный вывод), поэтому и плейсхолдер для пустого значения отдаём сами
  const renderValue = (current: Value | null) =>
    current == null ? placeholder : getValueView(current);

  return (
    <BaseSelect.Trigger className={triggerClass}>
      <BaseSelect.Value className={styles.value}>{renderValue}</BaseSelect.Value>
      <BaseSelect.Icon className={styles.icon}>
        <Icon type="chevron-small" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}
