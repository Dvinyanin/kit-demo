import { expect, test } from "vite-plus/test";

import { Select } from "../src/index.ts";

test("Select is exported", () => {
  expect(Select).toBeDefined();
  expect(Select.Root).toBeDefined();
  expect(Select.Trigger).toBeDefined();
  expect(Select.Content).toBeDefined();
  expect(Select.Item).toBeDefined();
});
