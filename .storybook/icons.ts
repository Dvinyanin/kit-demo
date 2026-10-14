import type { ArgTypes } from "@storybook/react";

import { icons, type IconName } from "../src/icons";

export const iconNames = Object.keys(icons) as IconName[];

export const iconControl: ArgTypes[string] = {
  control: { type: "select" },
  options: iconNames,
};
