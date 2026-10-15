import { Select as BaseSelect } from "@base-ui/react/select";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import type { IIcon } from "../../Icon";
import { Icon, renderIcon } from "../../Icon";

import styles from "./SelectShared.module.css";

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface ItemProps extends PropsWithChildren, BaseSelect.Item.Props {
  iconLeft?: IIcon;
  subtext?: string;
  suffix?: string;
  code?: string;
}

export function Item({
  children,
  iconLeft,
  subtext,
  suffix,
  code,
  className,
  ...props
}: ItemProps) {
  const hasSubtext = Boolean(subtext);

  return (
    <BaseSelect.Item
      {...props}
      className={(state) =>
        clsx(
          styles.item,
          { [styles.itemWithSubtext]: hasSubtext },
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {iconLeft && <span className={styles.itemIconLeft}>{renderIcon(iconLeft)}</span>}
      {code && <span className={styles.itemCode}>{code}</span>}
      <span className={styles.itemContent}>
        <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
        {subtext && <span className={styles.itemSubtext}>{subtext}</span>}
      </span>
      {suffix && <span className={styles.itemSuffix}>{suffix}</span>}
      <BaseSelect.ItemIndicator className={styles.itemIndicator}>
        <Icon type="check" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

// ─── MultiSelectItem ──────────────────────────────────────────────────────────

export interface MultiSelectItemProps extends PropsWithChildren, BaseSelect.Item.Props {
  iconLeft?: IIcon;
}

export function MultiSelectItem({ children, iconLeft, ...props }: MultiSelectItemProps) {
  return (
    <BaseSelect.Item {...props} className={clsx(styles.item, styles.itemCheckbox)}>
      <BaseSelect.ItemIndicator className={styles.checkboxIndicator} keepMounted>
        <span className={styles.checkboxBox}>
          <Icon type="check" />
        </span>
      </BaseSelect.ItemIndicator>
      {iconLeft && <span className={styles.itemIconLeft}>{renderIcon(iconLeft)}</span>}
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

// ─── Group ────────────────────────────────────────────────────────────────────

export function Group({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <BaseSelect.Group>
      <BaseSelect.GroupLabel className={styles.groupLabel}>{label}</BaseSelect.GroupLabel>
      {children}
    </BaseSelect.Group>
  );
}

// ─── NestedGroup ──────────────────────────────────────────────────────────────

export function NestedGroup({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <BaseSelect.Group className={styles.nestedGroup}>
      <BaseSelect.GroupLabel className={clsx(styles.groupLabel, styles.nestedGroupLabel)}>
        {label}
      </BaseSelect.GroupLabel>
      {children}
    </BaseSelect.Group>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

export function Separator() {
  return <BaseSelect.Separator className={styles.separator} />;
}

// ─── Popup ────────────────────────────────────────────────────────────────────

export function SelectPopup({
  size = "default",
  children,
}: PropsWithChildren<{ size?: "default" | "micro" }>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className={styles.positioner}
        sideOffset={4}
        alignItemWithTrigger={false}
      >
        <BaseSelect.Popup className={clsx(styles.popup, styles[size])}>
          <BaseSelect.List className={styles.list}>{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export { styles as sharedStyles };
