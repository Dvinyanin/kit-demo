import { use } from "react";

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
