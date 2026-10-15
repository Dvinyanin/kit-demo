import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import type { IIcon } from "../Icon";
import { Icon, renderIcon } from "../Icon";

import styles from "./ComboBox.module.css";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ItemProps extends PropsWithChildren, BaseCombobox.Item.Props {
  iconLeft?: IIcon;
}

function Item({ children, iconLeft, ...props }: ItemProps) {
  return (
    <BaseCombobox.Item {...props} className={styles.item}>
      {iconLeft && <span className={styles.itemIconLeft}>{renderIcon(iconLeft)}</span>}
      <span className={styles.itemText}>{children}</span>
      <BaseCombobox.ItemIndicator className={styles.itemIndicator}>
        <Icon type="check" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

interface MultiSelectItemProps extends PropsWithChildren, BaseCombobox.Item.Props {
  iconLeft?: IIcon;
}

function MultiSelectItem({ children, iconLeft, ...props }: MultiSelectItemProps) {
  return (
    <BaseCombobox.Item {...props} className={clsx(styles.item, styles.itemCheckbox)}>
      <BaseCombobox.ItemIndicator className={styles.checkboxIndicator} keepMounted>
        <span className={styles.checkboxBox}>
          <Icon type="check" />
        </span>
      </BaseCombobox.ItemIndicator>
      {iconLeft && <span className={styles.itemIconLeft}>{renderIcon(iconLeft)}</span>}
      <span className={styles.itemText}>{children}</span>
    </BaseCombobox.Item>
  );
}

function Group({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <BaseCombobox.Group>
      <BaseCombobox.GroupLabel className={styles.groupLabel}>{label}</BaseCombobox.GroupLabel>
      {children}
    </BaseCombobox.Group>
  );
}

function NestedGroup({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <BaseCombobox.Group className={styles.nestedGroup}>
      <BaseCombobox.GroupLabel className={clsx(styles.groupLabel, styles.nestedGroupLabel)}>
        {label}
      </BaseCombobox.GroupLabel>
      {children}
    </BaseCombobox.Group>
  );
}

function Separator() {
  return <BaseCombobox.Separator className={styles.separator} />;
}

// ─── Shared popup ─────────────────────────────────────────────────────────────

function Popup({ children }: PropsWithChildren) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner className={styles.positioner} sideOffset={4}>
        <BaseCombobox.Popup className={styles.popup}>
          <BaseCombobox.List className={styles.list}>
            <BaseCombobox.Empty className={styles.empty}>Ничего не найдено</BaseCombobox.Empty>
            {children}
          </BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

// ─── Root (single-select) ─────────────────────────────────────────────────────

export interface ComboBoxProps<
  Value extends string,
  Multiple extends boolean | undefined = false,
> extends BaseCombobox.Root.Props<Value, Multiple> {
  /** Label above the field */
  label?: string;
  /** Placeholder shown when no value selected */
  placeholder?: string;
  /** Helper text below the field */
  caption?: string;
  /** Error message (replaces caption) or true to show error state only */
  error?: string | boolean;
  /** Field size */
  size?: "default" | "micro";
  /** Icon inside the input group on the left */
  iconLeft?: IIcon;
  /** Whether the field is required (shows asterisk next to label) */
  required?: boolean;
}

function ComboBoxRoot<Value extends string, Multiple extends boolean | undefined = false>({
  children,
  label,
  placeholder,
  caption,
  error,
  size = "default",
  iconLeft,
  required,
  ...rootProps
}: ComboBoxProps<Value, Multiple>) {
  const hasError = Boolean(error);

  const renderBottomText = () => {
    if (error && typeof error === "string") return <p className={styles.errorText}>{error}</p>;
    if (caption) return <p className={styles.captionText}>{caption}</p>;
    return null;
  };

  const inputGroupClass = clsx(styles.inputGroup, {
    [styles.inputGroupMicro]: size === "micro",
    [styles.inputGroupError]: hasError,
  });

  return (
    <BaseCombobox.Root {...rootProps}>
      <div className={styles.wrapper}>
        {label && (
          <BaseCombobox.Label className={styles.label}>
            {label}
            {required && <span className={styles.asterisk}>*</span>}
          </BaseCombobox.Label>
        )}

        <BaseCombobox.InputGroup className={inputGroupClass}>
          {iconLeft && <span className={styles.iconLeft}>{renderIcon(iconLeft)}</span>}
          <BaseCombobox.Input
            className={styles.input}
            placeholder={placeholder}
            disabled={rootProps.disabled}
          />
          <BaseCombobox.Clear className={styles.clearButton}>
            <Icon type="clear-small" />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className={styles.chevron} disabled={rootProps.disabled}>
            <Icon type="chevron-small" />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>

        {renderBottomText()}
      </div>

      <Popup>{children}</Popup>
    </BaseCombobox.Root>
  );
}

// ─── Multi-select variant with chips ─────────────────────────────────────────

export interface ComboBoxMultiProps<Value extends string> extends Omit<
  BaseCombobox.Root.Props<Value, true>,
  "multiple"
> {
  label?: string;
  placeholder?: string;
  caption?: string;
  error?: string | boolean;
  size?: "default" | "micro";
  iconLeft?: IIcon;
  required?: boolean;
  /** Convert a selected value to a display label for its chip. Defaults to String(value). */
  getChipLabel?: (value: Value) => string;
}

function ComboBoxMultiRoot<Value extends string>({
  children,
  label,
  placeholder,
  caption,
  error,
  size = "default",
  iconLeft,
  required,
  getChipLabel,
  ...rootProps
}: ComboBoxMultiProps<Value>) {
  const hasError = Boolean(error);

  const renderBottomText = () => {
    if (error && typeof error === "string") return <p className={styles.errorText}>{error}</p>;
    if (caption) return <p className={styles.captionText}>{caption}</p>;
    return null;
  };

  const inputGroupClass = clsx(styles.inputGroup, {
    [styles.inputGroupMicro]: size === "micro",
    [styles.inputGroupError]: hasError,
  });

  return (
    <BaseCombobox.Root {...rootProps} multiple={true}>
      <div className={styles.wrapper}>
        {label && (
          <BaseCombobox.Label className={styles.label}>
            {label}
            {required && <span className={styles.asterisk}>*</span>}
          </BaseCombobox.Label>
        )}

        <BaseCombobox.InputGroup className={inputGroupClass}>
          {iconLeft && <span className={styles.iconLeft}>{renderIcon(iconLeft)}</span>}
          <BaseCombobox.Value>
            {(selected: Value[]) => (
              <BaseCombobox.Chips className={styles.chips}>
                {selected.map((v) => (
                  <BaseCombobox.Chip key={String(v)} className={styles.chip}>
                    {getChipLabel ? getChipLabel(v) : String(v)}
                    <BaseCombobox.ChipRemove className={styles.chipRemove}>
                      <Icon type="clear-small" />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                ))}
                <BaseCombobox.Input
                  className={styles.input}
                  placeholder={selected.length > 0 ? "" : placeholder}
                  disabled={rootProps.disabled}
                />
              </BaseCombobox.Chips>
            )}
          </BaseCombobox.Value>
          <BaseCombobox.Clear className={styles.clearButton}>
            <Icon type="clear-small" />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className={styles.chevron} disabled={rootProps.disabled}>
            <Icon type="chevron-small" />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>

        {renderBottomText()}
      </div>

      <Popup>{children}</Popup>
    </BaseCombobox.Root>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

const ComboBoxMulti = Object.assign(ComboBoxMultiRoot, {
  Item,
  MultiSelectItem,
  Group,
  NestedGroup,
  Separator,
});

export const ComboBox = Object.assign(ComboBoxRoot, {
  Item,
  MultiSelectItem,
  Group,
  NestedGroup,
  Separator,
  Multi: ComboBoxMulti,
});
