import type { ButtonProps } from "@base-ui/react/button";
import { Button } from "@base-ui/react/button";
import clsx from "clsx";

import type { IIcon } from "../Icon";
import { renderIcon } from "../Icon";
import type { ActionButtonMode, ActionButtonSize, ActionButtonVariant } from "./types";

import styles from "./styles.module.css";

export interface ActionButtonProps extends Omit<ButtonProps, "style" | "className"> {
  variant?: ActionButtonVariant;
  mode?: ActionButtonMode;
  size?: ActionButtonSize;
  iconLeft?: IIcon;
  iconRight?: IIcon;
  disabled?: boolean;
}

export function ActionButton({
  variant = "accent",
  mode = "filled",
  size = "medium",
  iconLeft,
  iconRight,
  children,
  disabled,
  ...rest
}: ActionButtonProps) {
  const classes = clsx(styles.actionButton, styles[mode], styles[size], styles[variant]);

  return (
    <Button className={classes} disabled={disabled} {...rest}>
      {iconLeft && <span className={styles.iconSlot}>{renderIcon(iconLeft)}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {iconRight && <span className={styles.iconSlot}>{renderIcon(iconRight)}</span>}
    </Button>
  );
}
