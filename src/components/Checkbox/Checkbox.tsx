import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { isReactNodeNotEmpty } from "@true-engineering/true-react-platform-helpers";
import clsx from "clsx";
import type { ReactNode } from "react";

import { CheckboxMark } from "./CheckboxMark";
import type { CheckboxLabelPosition, CheckboxSize } from "./types";

import styles from "./styles.module.css";

export interface CheckboxProps extends Omit<
  BaseCheckbox.Root.Props,
  | "className"
  | "style"
  | "render"
  | "children"
  | "value"
  | "checked"
  | "defaultChecked"
  | "onCheckedChange"
  | "onChange"
  | "nativeButton"
  | "parent"
  | "uncheckedValue"
> {
  /** Whether the checkbox is ticked. The checkbox is always controlled: changes arrive through `onChange` */
  value?: boolean;
  onChange?: (value: boolean) => void;
  size?: CheckboxSize;
  /** Where the label is relative to the box (the label itself is `children`) */
  labelPosition?: CheckboxLabelPosition;
  /** Error state of the checkbox */
  invalid?: boolean;
  /** Label. Without it the checkbox has no label: pass `aria-label` */
  children?: ReactNode;
}

export function Checkbox({
  value,
  onChange,
  indeterminate,
  disabled,
  readOnly,
  size = "medium",
  labelPosition = "right",
  invalid,
  children,
  ...rest
}: CheckboxProps) {
  return (
    <label
      className={clsx(styles.checkbox, styles[size], styles[labelPosition], {
        [styles.invalid]: invalid,
        [styles.disabled]: disabled,
        [styles.readOnly]: readOnly,
      })}
    >
      <BaseCheckbox.Root
        {...rest}
        className={styles.box}
        checked={value ?? false}
        indeterminate={indeterminate}
        disabled={disabled}
        readOnly={readOnly}
        onCheckedChange={(next) => onChange?.(next)}
      >
        <BaseCheckbox.Indicator className={styles.indicator}>
          <CheckboxMark size={size} indeterminate={indeterminate} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {isReactNodeNotEmpty(children) && <span className={styles.label}>{children}</span>}
    </label>
  );
}
