import type { Meta, StoryObj } from "@storybook/react";

import { icons } from "../../icons";
import { Icon } from "./Icon";
import type { IconName } from "./IconProvider";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  args: {
    type: "check",
  },
  argTypes: {
    type: { control: "select", options: Object.keys(icons) },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: ({ type }) => <Icon type={type} />,
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
    externalGradient: { control: "boolean", name: "External gradient", description: "123" },
    iconColor: { control: "color", name: "--icon-color" },
    colorStart: { control: "color", name: "--icon-color-start" },
    colorEnd: { control: "color", name: "--icon-color-end" },
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
