import type { Meta, StoryObj } from "@storybook/react";

import { figmaUrl } from "@/storybook/figma";
import { iconControl } from "@/storybook/icons";

import { ActionButton } from "./ActionButton";
import { actionButtonModes, actionButtonSizes, actionButtonVariants } from "./constants";

const meta: Meta<typeof ActionButton> = {
  title: "Components/ActionButton",
  component: ActionButton,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("webComponents", "8122-7632"),
    },
  },
  argTypes: {
    variant: { control: { type: "select" }, options: actionButtonVariants },
    mode: { control: { type: "select" }, options: actionButtonModes },
    size: { control: { type: "select" }, options: actionButtonSizes },
    disabled: { control: "boolean" },
    iconLeft: iconControl,
    iconRight: iconControl,
  },
  args: {
    variant: "accent",
    mode: "filled",
    size: "medium",
    disabled: false,
    children: "Button",
  },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

const sizes = actionButtonSizes;
const modes = actionButtonModes;

export const Playground: Story = {
  name: "Playground",
};

export const AllVariants: Story = {
  name: "Variant overview",
  parameters: { controls: { include: ["variant"] } },
  render({ variant }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {modes.map((mode) => (
          <div
            key={mode}
            style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}
          >
            {sizes.map((size) => (
              <ActionButton key={size} variant={variant} mode={mode} size={size}>
                {size}
              </ActionButton>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const WithIcons: Story = {
  name: "With icons",
  parameters: { controls: { disable: true } },
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <ActionButton iconLeft="heart">Icon left</ActionButton>
          <ActionButton iconRight="heart">Icon right</ActionButton>
          <ActionButton iconLeft="heart" iconRight="heart">
            Both icons
          </ActionButton>
          <ActionButton iconLeft="heart" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <ActionButton variant="neutral" iconLeft="heart">
            Icon left
          </ActionButton>
          <ActionButton variant="neutral" mode="outline" iconRight="heart">
            Icon right
          </ActionButton>
          <ActionButton variant="neutral" mode="ghost" iconLeft="heart" iconRight="heart">
            Both icons
          </ActionButton>
        </div>
      </div>
    );
  },
};
