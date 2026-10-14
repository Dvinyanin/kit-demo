import { isValidElement, use, type ReactElement, type ReactNode } from "react";

import type { IconName } from "@/icons";

import { IconContext } from "./IconProvider";

import styles from "./Icon.module.css";

interface IconProps {
  type: IconName;
}

export function Icon({ type }: IconProps) {
  const __html = use(IconContext)?.[type] ?? type;

  return <div aria-hidden="true" className={styles.icon} dangerouslySetInnerHTML={{ __html }} />;
}

export type IIcon = IconName | ReactElement;

export function renderIcon(icon: IIcon): ReactNode {
  return isValidElement(icon) ? icon : <Icon type={icon as IconName} />;
}
