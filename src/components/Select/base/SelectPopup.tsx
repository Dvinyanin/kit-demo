import { Select as BaseSelect } from "@base-ui/react/select";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import styles from "./SelectPopup.module.css";

export interface SelectPopupProps {
  /** Размер ячеек и отступов; должен совпадать с размером триггера */
  size?: "default" | "micro";
}

/** Окно списка: Portal, Positioner, Popup и прокручиваемый List. Кладётся в `SelectCore` как `children`. */
export function SelectPopup({ size = "default", children }: PropsWithChildren<SelectPopupProps>) {
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
