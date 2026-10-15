import { SelectField } from "./SelectField";
import type { SelectFieldProps } from "./SelectField";
import { Group, Item, NestedGroup, Separator } from "./SelectShared";

export type SelectBaseProps<Value extends string> = Omit<
  SelectFieldProps<Value, false>,
  "multiple"
>;

function SelectBaseRoot<Value extends string>(props: SelectBaseProps<Value>) {
  return <SelectField {...props} multiple={false} />;
}

export const SelectBase = Object.assign(SelectBaseRoot, {
  Item,
  Group,
  NestedGroup,
  Separator,
});
