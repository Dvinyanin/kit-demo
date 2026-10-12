import { Select as BaseSelect } from "@base-ui/react/select";
import type { PropsWithChildren } from "react";

import { Icon } from "../Icon";

import styles from "./Select.module.css";

const Root = BaseSelect.Root;

function Trigger(props: BaseSelect.Trigger.Props) {
  return (
    <BaseSelect.Trigger {...props} className={styles.trigger}>
      {props.children}
    </BaseSelect.Trigger>
  );
}

function Value(props: BaseSelect.Value.Props) {
  return <BaseSelect.Value {...props} className={styles.value} />;
}

function SelectIcon(props: BaseSelect.Icon.Props) {
  return (
    <BaseSelect.Icon {...props} className={styles.icon}>
      {props.children ?? <Icon type="chevron" />}
    </BaseSelect.Icon>
  );
}

function Content(props: PropsWithChildren) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner className={styles.positioner} sideOffset={4}>
        <BaseSelect.Popup className={styles.popup}>
          <BaseSelect.ScrollUpArrow className={styles.scrollArrow}>
            <Icon type="arrow-up" />
          </BaseSelect.ScrollUpArrow>
          <BaseSelect.List className={styles.list}>{props.children}</BaseSelect.List>
          <BaseSelect.ScrollDownArrow className={styles.scrollArrow}>
            <Icon type="arrow-down" />
          </BaseSelect.ScrollDownArrow>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function Item({ children, ...props }: BaseSelect.Item.Props & { children: React.ReactNode }) {
  return (
    <BaseSelect.Item {...props} className={styles.item}>
      <BaseSelect.ItemIndicator className={styles.itemIndicator}>
        <Icon type="check" />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className={styles.itemText}>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

export const Select = {
  Root,
  Trigger,
  Value,
  Icon: SelectIcon,
  Content,
  Item,
};
