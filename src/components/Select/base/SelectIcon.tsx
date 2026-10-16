import { stopPropagation } from "@true-engineering/true-react-platform-helpers";
import type { MouseEvent } from "react";

import type { IconName } from "../../Icon";
import { Icon } from "../../Icon";

import styles from "./SelectIcon.module.css";

export interface SelectIconProps {
  type: IconName;
  /** С обработчиком иконка становится кнопкой, которая не открывает список; без него это просто иконка */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Доступное имя кнопки */
  label?: string;
}

/** Иконка для слотов `iconLeft` и `iconRight` поля: обычная или кнопка. */
export function SelectIcon({ type, onClick, label }: SelectIconProps) {
  if (!onClick) return <Icon type={type} />;

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={label}
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onKeyDown={stopPropagation}
      onClick={(event) => {
        stopPropagation(event);
        onClick(event);
      }}
    >
      <Icon type={type} />
    </button>
  );
}
