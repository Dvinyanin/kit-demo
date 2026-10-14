import React from "react";
import { addons, types, useGlobals } from "storybook/manager-api";

const ADDON_ID = "theme-toggle";
const BACKGROUND_ID = "background-toggle";

const baseBtn: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  borderRadius: 4,
  margin: "0 2px",
};

function ThemeToggle() {
  const [globals, updateGlobals] = useGlobals();
  const isDarkTheme = globals.isDarkTheme ?? false;
  return (
    <button
      title={isDarkTheme ? "Switch to light" : "Switch to dark"}
      style={{
        ...baseBtn,
        width: 86,
        background: isDarkTheme ? "#272727" : "#e8e8e8",
        color: isDarkTheme ? "#fff" : "#333",
      }}
      onClick={() => updateGlobals({ isDarkTheme: !isDarkTheme })}
    >
      {isDarkTheme ? "Dark theme" : "Light theme"}
    </button>
  );
}

function BackgroundToggle() {
  const [globals, updateGlobals] = useGlobals();
  const withBackground = globals.withBackground ?? false;
  return (
    <button
      title={withBackground ? "Remove background" : "Add background"}
      style={{
        ...baseBtn,
        width: 138,
        background: withBackground ? "#3a3f4b" : "#e8e8e8",
        color: withBackground ? "#fff" : "#333",
      }}
      onClick={() => updateGlobals({ withBackground: !withBackground })}
    >
      {withBackground ? "With background" : "Without background"}
    </button>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    title: "Theme",
    render: () => <ThemeToggle />,
  });
});

addons.register(BACKGROUND_ID, () => {
  addons.add(BACKGROUND_ID, {
    type: types.TOOL,
    title: "Background",
    render: () => <BackgroundToggle />,
  });
});
