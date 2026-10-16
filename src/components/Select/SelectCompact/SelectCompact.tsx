import type { OptionProps } from "../base/options";
import { SelectCore } from "../base/SelectCore";
import { OptionContent, SelectItem } from "../base/SelectItem";
import { SelectPopup } from "../base/SelectPopup";
import { SelectCompactTrigger } from "./SelectCompactTrigger";
import type { SelectCompactTriggerProps } from "./SelectCompactTrigger";

interface SelectCompactProps<Item>
  extends OptionProps<Item>, Pick<SelectCompactTriggerProps, "placeholder" | "fontStyle"> {
  /** Выбранный элемент (сам элемент из `options`). `undefined` значит «ничего не выбрано». */
  value?: Item;
  onChange?: (value: NoInfer<Item> | undefined) => void;
  options: Item[];
  disabled?: boolean;
}

function SelectCompactRoot<Item>({
  value,
  onChange,
  options,
  getOptionId = String,
  getValueView = getOptionId,
  getOptionView = getValueView,
  isOptionDisabled,
  disabled,
  placeholder,
  fontStyle,
}: SelectCompactProps<Item>) {
  return (
    <SelectCore<Item>
      value={value}
      onChange={onChange}
      isItemEqualToValue={(a, b) => getOptionId(a) === getOptionId(b)}
      disabled={disabled}
      renderTrigger={() => (
        <SelectCompactTrigger<Item>
          placeholder={placeholder}
          fontStyle={fontStyle}
          getValueView={getValueView}
        />
      )}
    >
      <SelectPopup>
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

export const SelectCompact = Object.assign(SelectCompactRoot, { OptionContent });

export declare namespace SelectCompact {
  type Props<Item> = SelectCompactProps<Item>;
}
