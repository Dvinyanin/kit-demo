import { Select as BaseSelect } from "@base-ui/react/select";
import clsx from "clsx";

import { Icon } from "../../Icon";
import {
  Group,
  Item,
  MultiSelectItem,
  NestedGroup,
  SelectPopup,
  Separator,
} from "../base/SelectShared";

import styles from "./SelectCompact.module.css";

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface SelectCompactProps<
  Value extends string,
  Multiple extends boolean = false,
> extends BaseSelect.Root.Props<Value, Multiple> {
  placeholder?: string;
  fontStyle?: "default" | "bold";
}

function SelectCompactRoot<Value extends string, Multiple extends boolean = false>({
  children,
  placeholder,
  fontStyle = "default",
  ...rootProps
}: SelectCompactProps<Value, Multiple>) {
  const triggerClass = clsx(styles.trigger, { [styles.triggerBold]: fontStyle === "bold" });

  return (
    <BaseSelect.Root {...rootProps}>
      <BaseSelect.Trigger className={triggerClass}>
        <BaseSelect.Value placeholder={placeholder} className={styles.value} />
        <BaseSelect.Icon className={styles.icon}>
          <Icon type="chevron-small" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <SelectPopup>{children}</SelectPopup>
    </BaseSelect.Root>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const SelectCompact = Object.assign(SelectCompactRoot, {
  Item,
  MultiSelectItem,
  Group,
  NestedGroup,
  Separator,
});
