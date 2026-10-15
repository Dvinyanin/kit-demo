import { SelectField } from "./SelectField";
import type { SelectFieldProps } from "./SelectField";
import { Group, MultiSelectItem, NestedGroup, Separator } from "./SelectShared";

export type MultiSelectBaseProps<Value extends string> = Omit<
  SelectFieldProps<Value, true>,
  "multiple"
>;

function MultiSelectBaseRoot<Value extends string>(props: MultiSelectBaseProps<Value>) {
  return <SelectField {...props} multiple />;
}

export const MultiSelectBase = Object.assign(MultiSelectBaseRoot, {
  Item: MultiSelectItem,
  Group,
  NestedGroup,
  Separator,
});
