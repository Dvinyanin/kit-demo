import { Select as BaseSelect } from "@base-ui/react/select";

import { Checkbox } from "../../Checkbox";
import { itemClassName, withContent } from "../base/SelectItem";

import styles from "./MultiSelectItem.module.css";

export interface MultiSelectItemProps extends BaseSelect.Item.Props {
  /** Размер списка: определяет размер чекбокса (Default 18, Micro 16) */
  size?: "default" | "micro";
}

/** Ячейка списка мультивыбора: чекбокс слева и содержимое. Выбор обрабатывает ячейка, чекбокс только показывает состояние. */
export function MultiSelectItem({
  children,
  className,
  size = "default",
  disabled,
  ...props
}: MultiSelectItemProps) {
  return (
    <BaseSelect.Item
      {...props}
      disabled={disabled}
      className={(state) => itemClassName(className, state)}
    >
      <BaseSelect.ItemIndicator
        keepMounted
        render={(indicatorProps, { selected }) => (
          // inert: чекбокс внутри ячейки не фокусируется и не принимает мышь, клик получает ячейка
          <span {...indicatorProps} className={styles.checkbox} inert>
            <Checkbox
              value={selected}
              size={size === "micro" ? "small" : "medium"}
              disabled={disabled}
            />
          </span>
        )}
      />
      {withContent(children)}
    </BaseSelect.Item>
  );
}
