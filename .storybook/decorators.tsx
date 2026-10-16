import type { Decorator } from "@storybook/react";

// Поля растягиваются на всю ширину родителя, поэтому в историях ограничиваем её оболочкой
export const fieldWidth =
  (width = 240): Decorator =>
  (Story) => (
    <div style={{ width }}>
      <Story />
    </div>
  );
