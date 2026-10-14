import type { ButtonProps } from "@base-ui/react/button";
import { Button } from "@base-ui/react/button";
import clsx from "clsx";

import type { IIcon } from "../Icon";
import { renderIcon } from "../Icon";
import type { TextButtonMode, TextButtonSize, TextButtonVariant } from "./types";

import styles from "./styles.module.css";

export interface TextButtonProps extends Omit<ButtonProps, "style" | "className"> {
  variant?: TextButtonVariant;
  mode?: TextButtonMode;
  size?: TextButtonSize;
  iconLeft?: IIcon;
  iconRight?: IIcon;
  disabled?: boolean;
}

export function TextButton({
  variant = "accent",
  mode = "primary",
  size = "medium",
  iconLeft,
  iconRight,
  children,
  disabled,
  ...rest
}: TextButtonProps) {
  const classes = clsx(styles.textButton, styles[mode], styles[size], styles[variant]);

  return (
    <Button className={classes} disabled={disabled} {...rest}>
      {iconLeft && <span className={styles.iconSlot}>{renderIcon(iconLeft)}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {iconRight && <span className={styles.iconSlot}>{renderIcon(iconRight)}</span>}
    </Button>
  );
}
