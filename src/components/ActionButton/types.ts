import type { ButtonProps } from "@base-ui/react/button";

import type { IIcon } from "../Icon";
import type { actionButtonModes, actionButtonSizes, actionButtonVariants } from "./constants";

export type ActionButtonVariant = (typeof actionButtonVariants)[number];
export type ActionButtonMode = (typeof actionButtonModes)[number];
export type ActionButtonSize = (typeof actionButtonSizes)[number];

export interface ActionButtonProps extends Omit<ButtonProps, "style" | "className"> {
  variant?: ActionButtonVariant;
  mode?: ActionButtonMode;
  size?: ActionButtonSize;
  iconLeft?: IIcon;
  iconRight?: IIcon;
  disabled?: boolean;
}
