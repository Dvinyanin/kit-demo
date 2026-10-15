import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

import { figmaUrl } from "@/storybook/figma";
import { iconControl } from "@/storybook/icons";

import { textButtonModes, textButtonSizes, textButtonVariants } from "./constants";
import { TextButton } from "./TextButton";

const meta: Meta<typeof TextButton> = {
  title: "Components/TextButton",
  component: TextButton,
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("webComponents", "8260-15153"),
    },
  },
  argTypes: {
    variant: { control: { type: "select" }, options: textButtonVariants },
    mode: { control: { type: "select" }, options: textButtonModes },
    size: { control: { type: "select" }, options: textButtonSizes },
    disabled: { control: "boolean" },
    iconLeft: iconControl,
    iconRight: iconControl,
  },
  args: {
    variant: "accent",
    mode: "primary",
    size: "medium",
    disabled: false,
    children: "Text Button",
  },
};

export default meta;

type Story = StoryObj<typeof TextButton>;

const sizes = textButtonSizes;
const rows: { key: string; props: Partial<ComponentProps<typeof TextButton>> }[] = [
  { key: "default", props: {} },
  { key: "disabled", props: { disabled: true } },
  { key: "icons", props: { iconLeft: "heart", iconRight: "heart" } },
];
const modes = textButtonModes;

export const Playground: Story = {
  name: "Playground",
};

export const AllVariants: Story = {
  name: "Variant overview",
  parameters: { controls: { include: ["variant"] } },
  render({ variant }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {modes.map((mode) =>
          rows.map(({ key, props }) => (
            <div
              key={`${mode}-${key}`}
              style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}
            >
              {sizes.map((size) => (
                <TextButton key={size} variant={variant} mode={mode} size={size} {...props}>
                  {size}
                </TextButton>
              ))}
            </div>
          )),
        )}
      </div>
    );
  },
};

export const WithIcons: Story = {
  name: "With icons",
  parameters: { controls: { disable: true } },
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <TextButton iconLeft="heart">Icon left</TextButton>
          <TextButton iconRight="heart">Icon right</TextButton>
          <TextButton iconLeft="heart" iconRight="heart">
            Both icons
          </TextButton>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <TextButton mode="secondary" iconLeft="heart">
            Icon left
          </TextButton>
          <TextButton mode="secondary" iconRight="heart">
            Icon right
          </TextButton>
          <TextButton mode="secondary" iconLeft="heart" iconRight="heart">
            Both icons
          </TextButton>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <TextButton variant="neutral" iconLeft="heart">
            Neutral
          </TextButton>
          <TextButton variant="info" iconLeft="heart">
            Info
          </TextButton>
          <TextButton variant="destructive" iconLeft="heart">
            Destructive
          </TextButton>
        </div>
      </div>
    );
  },
};
