import type { actionButtonModes, actionButtonSizes, actionButtonVariants } from "./constants";

export type ActionButtonVariant = (typeof actionButtonVariants)[number];
export type ActionButtonMode = (typeof actionButtonModes)[number];
export type ActionButtonSize = (typeof actionButtonSizes)[number];
