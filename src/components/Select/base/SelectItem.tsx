import { Select as BaseSelect } from "@base-ui/react/select";
import { applyAction, isReactNodeNotEmpty } from "@true-engineering/true-react-platform-helpers";
import clsx from "clsx";
import { isValidElement } from "react";
import type { ReactNode } from "react";

import { Icon } from "../../Icon";

import styles from "./SelectItem.module.css";

// ─── OptionContent ────────────────────────────────────────────────────────────

export interface OptionContentProps {
  children?: ReactNode;
  /** Слот слева от текста (код, иконка `<Select.Icon />`): считается текстом, остальное оформляйте сами */
  prefix?: ReactNode;
  /** Слот справа от текста */
  suffix?: ReactNode;
  /** Вторая строка под текстом */
  subtext?: ReactNode;
}

/** Содержимое ячейки списка: префикс, текст с подписью, суффикс. Возвращается из `getOptionView` или кладётся в `SelectItem`. */
export function OptionContent({ children, prefix, suffix, subtext }: OptionContentProps) {
  return (
    <span
      className={clsx(styles.optionContent, {
        [styles.optionContentWithSubtext]: isReactNodeNotEmpty(subtext),
      })}
    >
      {isReactNodeNotEmpty(prefix) && <span className={styles.itemPrefix}>{prefix}</span>}
      <span className={styles.itemContent}>
        <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
        {isReactNodeNotEmpty(subtext) && <span className={styles.itemSubtext}>{subtext}</span>}
      </span>
      {isReactNodeNotEmpty(suffix) && <span className={styles.itemSuffix}>{suffix}</span>}
    </span>
  );
}

/** Всё, что не `OptionContent`, оборачивается в него (текст, тег статуса и т. п.). */
export const withContent = (children: ReactNode) =>
  isValidElement(children) && children.type === OptionContent ? (
    children
  ) : (
    <OptionContent>{children}</OptionContent>
  );

/** Класс ячейки с учётом `className` потребителя (строка или функция Base UI). */
export const itemClassName = (
  className: BaseSelect.Item.Props["className"],
  state: BaseSelect.Item.State,
) => clsx(styles.item, applyAction(className, state));

// ─── SelectItem ───────────────────────────────────────────────────────────────

export type SelectItemProps = BaseSelect.Item.Props;

/** Ячейка списка одиночного выбора: содержимое и галочка справа у выбранной. */
export function SelectItem({ children, className, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item {...props} className={(state) => itemClassName(className, state)}>
      {withContent(children)}
      <BaseSelect.ItemIndicator className={styles.itemIndicator}>
        <Icon type="check" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
