import type { OptionProps } from "../base/options";
import { SelectCore } from "../base/SelectCore";
import { SelectIcon } from "../base/SelectIcon";
import { OptionContent, SelectItem } from "../base/SelectItem";
import { SelectPopup } from "../base/SelectPopup";
import type { SelectCommonProps } from "../base/SelectTrigger";
import { SelectTrigger } from "../base/SelectTrigger";

interface SelectProps<Item> extends SelectCommonProps, OptionProps<Item> {
  /** Выбранный элемент (сам элемент из `options`). `undefined` значит «ничего не выбрано». */
  value?: Item;
  /** Вызывается с выбранным элементом, при очистке с `undefined`. */
  onChange?: (value: NoInfer<Item> | undefined) => void;
  options: Item[];
}

function SelectRoot<Item>({
  value,
  onChange,
  options,
  getOptionId = String,
  getValueView = getOptionId,
  getOptionView = getValueView,
  isOptionDisabled,
  disabled,
  required,
  readOnly,
  ...triggerProps
}: SelectProps<Item>) {
  return (
    <SelectCore<Item>
      value={value}
      onChange={onChange}
      isItemEqualToValue={(a, b) => getOptionId(a) === getOptionId(b)}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      renderTrigger={({ clear }) => (
        <SelectTrigger
          {...triggerProps}
          readOnly={readOnly}
          getValueView={getValueView}
          onClear={clear}
        />
      )}
    >
      <SelectPopup size={triggerProps.size}>
        {options.map((option) => (
          <SelectItem
            key={getOptionId(option)}
            value={option}
            disabled={isOptionDisabled?.(option)}
          >
            {getOptionView(option)}
          </SelectItem>
        ))}
      </SelectPopup>
    </SelectCore>
  );
}

export const Select = Object.assign(SelectRoot, {
  Icon: SelectIcon,
  OptionContent,
});

export declare namespace Select {
  type Props<Item> = SelectProps<Item>;
}
