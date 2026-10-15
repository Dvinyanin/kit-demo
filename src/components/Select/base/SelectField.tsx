import { Select as BaseSelect } from "@base-ui/react/select";
import clsx from "clsx";
import type { MouseEvent, ReactNode, SyntheticEvent } from "react";

import type { IIcon } from "../../Icon";
import { Icon, renderIcon } from "../../Icon";
import { SelectPopup } from "./SelectShared";

import styles from "./SelectField.module.css";

// Кнопки внутри триггера не должны открывать попап
const stopPropagation = (event: SyntheticEvent) => event.stopPropagation();

// Общая основа SelectDefault и SelectMultiple: триггер, иконки, очистка, попап.
// Наружу не экспортируется, пользователи работают с обёртками.

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface SelectFieldProps<
  Value extends string,
  Multiple extends boolean = false,
> extends Omit<BaseSelect.Root.Props<Value, Multiple>, "defaultValue"> {
  /**
   * Selected value (an array when `multiple`). The select is always controlled:
   * `undefined` means nothing is selected, changes arrive through `onValueChange`.
   */
  value?: BaseSelect.Root.Props<Value, Multiple>["value"];
  /** Label shown inside the trigger (floats to top when value is selected) */
  label?: string;
  /** Placeholder shown when no value selected and no label */
  placeholder?: string;
  /** Helper text below the field */
  caption?: string;
  /** Error message (replaces caption) or true to show error state only */
  error?: string | boolean;
  /** Field size */
  size?: "default" | "micro";
  /** Icon inside the trigger on the left */
  iconLeft?: IIcon;
  /** Icon inside the trigger on the right, before the chevron */
  iconRight?: IIcon;
  /** Suffix text (e.g. a currency) inside the trigger, between the right icon and the chevron */
  suffix?: string;
  /** Makes the right icon a button (it does not open the popup) */
  onIconRightClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name of the right icon button */
  iconRightLabel?: string;
  /** Shows a clear button while a value is selected (calls `onValueChange` with `null` or `[]`) */
  clearable?: boolean;
  /** Accessible name of the clear button */
  clearLabel?: string;
  /** Whether the field is required (shows asterisk next to label) */
  required?: boolean;
  /**
   * What the trigger shows for the current value. Receives the value (an array when `multiple`).
   * Without it Base UI shows the raw value, or the item label if `items` is passed.
   */
  renderValue?: (value: Multiple extends true ? Value[] : Value | null) => ReactNode;
  /** Makes the field non-interactive but readable (not greyed out like disabled) */
  readOnly?: boolean;
}

export function SelectField<Value extends string, Multiple extends boolean = false>({
  children,
  label,
  placeholder,
  caption,
  error,
  size = "default",
  iconLeft,
  iconRight,
  suffix,
  onIconRightClick,
  iconRightLabel,
  clearable,
  clearLabel = "Очистить",
  required,
  readOnly,
  renderValue,
  value,
  ...rootProps
}: SelectFieldProps<Value, Multiple>) {
  const hasError = Boolean(error);
  const { multiple, onValueChange } = rootProps;

  // Кнопки внутри триггера недопустимы в <button>, поэтому триггер становится div
  const hasButtons = Boolean(clearable) || Boolean(onIconRightClick);

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onValueChange?.(
      (multiple ? [] : null) as never,
      {
        reason: "imperative-action",
        event: event.nativeEvent,
        cancel: () => undefined,
        allowPropagation: () => undefined,
        isCanceled: false,
        isPropagationAllowed: false,
        trigger: event.currentTarget,
      } as never,
    );
  };

  // Base UI не показывает placeholder, если задан children, поэтому для пустого значения отдаём его сами
  const renderValueOrPlaceholder = (current: unknown) => {
    const isEmpty = current == null || (Array.isArray(current) && current.length === 0);
    return isEmpty ? placeholder : renderValue?.(current as never);
  };

  const renderBottomText = () => {
    if (error && typeof error === "string") return <p className={styles.errorText}>{error}</p>;
    if (caption) return <p className={styles.captionText}>{caption}</p>;
    return null;
  };

  const triggerClass = clsx(styles.trigger, styles[size], {
    [styles.triggerError]: hasError,
    [styles.triggerReadOnly]: readOnly,
  });

  return (
    <BaseSelect.Root
      {...rootProps}
      value={value ?? ((multiple ? [] : null) as typeof value)}
      required={required}
    >
      <div className={styles.wrapper}>
        <BaseSelect.Trigger
          className={triggerClass}
          {...(hasButtons ? { render: <div />, nativeButton: false } : {})}
          {...(readOnly ? { "aria-readonly": true, tabIndex: 0 } : {})}
        >
          {iconLeft && <span className={styles.iconLeft}>{renderIcon(iconLeft)}</span>}
          <span className={styles.inputWrapper}>
            <span className={styles.triggerContent}>
              {label && (
                <BaseSelect.Label className={styles.innerLabel}>
                  {label}
                  {required && <span className={styles.asterisk}>*</span>}
                </BaseSelect.Label>
              )}
              <BaseSelect.Value placeholder={placeholder} className={styles.value}>
                {renderValue ? renderValueOrPlaceholder : undefined}
              </BaseSelect.Value>
            </span>
            {clearable && (
              <button
                type="button"
                className={clsx(styles.iconButton, styles.clear)}
                aria-label={clearLabel}
                onPointerDown={stopPropagation}
                onMouseDown={stopPropagation}
                onKeyDown={stopPropagation}
                onClick={handleClear}
              >
                <Icon type="clear" />
              </button>
            )}
          </span>
          {iconRight &&
            (onIconRightClick ? (
              <button
                type="button"
                className={styles.iconButton}
                aria-label={iconRightLabel}
                onPointerDown={stopPropagation}
                onMouseDown={stopPropagation}
                onKeyDown={stopPropagation}
                onClick={(event) => {
                  event.stopPropagation();
                  onIconRightClick(event);
                }}
              >
                {renderIcon(iconRight)}
              </button>
            ) : (
              <span className={styles.iconRight}>{renderIcon(iconRight)}</span>
            ))}
          {suffix && <span className={styles.suffix}>{suffix}</span>}
          <BaseSelect.Icon className={styles.icon}>
            <Icon type="chevron" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        {renderBottomText()}
      </div>

      <SelectPopup size={size}>{children}</SelectPopup>
    </BaseSelect.Root>
  );
}
