import type { Meta, StoryObj } from "@storybook/react";

import { figmaUrl } from "@/storybook/figma";
import { iconNames } from "@/storybook/icons";

import { Icon } from "./Icon";
import type { IconName } from "./IconProvider";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    type: { control: false },
  },
  parameters: {
    design: {
      type: "figma",
      url: figmaUrl("webComponents", "37-621"),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const All: Story = {
  name: "All icons",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {iconNames.map((name) => (
        <div
          key={name}
          title={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            width: 64,
          }}
        >
          <div style={{ "--icon-size": "32px" } as React.CSSProperties}>
            <Icon type={name} />
          </div>
          <span
            style={{ fontSize: 10, color: "#888", textAlign: "center", wordBreak: "break-all" }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

interface GradientArgs {
  type: IconName;
  externalGradient: boolean;
  iconColor: string;
  colorStart: string;
  colorEnd: string;
}

export const GradientCustomize: StoryObj<GradientArgs> = {
  name: "Color customization",
  args: {
    type: "lightning-accent",
    externalGradient: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: iconNames.filter((icon) => icon.includes("accent")),
    },
    externalGradient: { control: "boolean", name: "External gradient" },
    iconColor: {
      control: "color",
      name: "--icon-color",
      if: { arg: "externalGradient", truthy: false },
    },
    colorStart: {
      control: "color",
      name: "--icon-color-start",
      if: { arg: "externalGradient", truthy: false },
    },
    colorEnd: {
      control: "color",
      name: "--icon-color-end",
      if: { arg: "externalGradient", truthy: false },
    },
  },
  render: ({ type, externalGradient, iconColor, colorStart, colorEnd }) => {
    const fill = externalGradient ? "url(#external-gradient)" : iconColor || undefined;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
        {externalGradient && (
          <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
            <defs>
              <linearGradient id="external-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f093fb" />
                <stop offset="100%" stopColor="#f5576c" />
              </linearGradient>
            </defs>
          </svg>
        )}
        <div
          style={
            {
              "--icon-size": "80px",
              ...(fill ? { "--icon-color": fill } : {}),
              ...(colorStart ? { "--icon-color-start": colorStart } : {}),
              ...(colorEnd ? { "--icon-color-end": colorEnd } : {}),
            } as React.CSSProperties
          }
        >
          <Icon type={type} />
        </div>
      </div>
    );
  },
};
