import { Fragment } from "react";

import type { OptionProps } from "../base/options";
import { SelectCore } from "../base/SelectCore";
import { SelectIcon } from "../base/SelectIcon";
import { OptionContent } from "../base/SelectItem";
import { SelectPopup } from "../base/SelectPopup";
import { SelectTrigger } from "../base/SelectTrigger";
import type { SelectCommonProps } from "../base/SelectTrigger";
import { MultiSelectItem } from "./MultiSelectItem";

interface MultiSelectProps<Item> extends SelectCommonProps, OptionProps<Item> {
  /** Выбранные элементы (сами элементы из `options`). `undefined` значит «ничего не выбрано». */
  value?: Item[];
  /** Вызывается с выбранными элементами, при очистке с пустым массивом. */
  onChange?: (value: NoInfer<Item>[]) => void;
  options: Item[];
}

function MultiSelectRoot<Item>({
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
}: MultiSelectProps<Item>) {
  return (
    <SelectCore<Item, true>
      multiple
      value={value}
      onChange={onChange}
      isItemEqualToValue={(a, b) => getOptionId(a) === getOptionId(b)}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      renderTrigger={({ clear }) => (
        <SelectTrigger<Item[]>
          {...triggerProps}
          readOnly={readOnly}
          // Выбранные значения через запятую; пустой массив для триггера не «нет значения», поэтому плейсхолдер подставляем здесь
          getValueView={(current) =>
            current.length === 0
              ? triggerProps.placeholder
              : current.map((item, index) => (
                  <Fragment key={getOptionId(item)}>
                    {index > 0 && ", "}
                    {getValueView(item)}
                  </Fragment>
                ))
          }
          onClear={clear}
        />
      )}
    >
      <SelectPopup size={triggerProps.size}>
        {options.map((option) => (
          <MultiSelectItem
            key={getOptionId(option)}
            value={option}
            size={triggerProps.size}
            disabled={isOptionDisabled?.(option)}
          >
            {getOptionView(option)}
          </MultiSelectItem>
        ))}
      </SelectPopup>
    </SelectCore>
  );
}

export const MultiSelect = Object.assign(MultiSelectRoot, {
  Icon: SelectIcon,
  OptionContent,
});

export declare namespace MultiSelect {
  type Props<Item> = MultiSelectProps<Item>;
}
