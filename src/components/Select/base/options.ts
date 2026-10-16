import type { ReactNode } from "react";

// Общие пропсы списка опций для Select, MultiSelect и SelectCompact.
// Значение поля — сам элемент списка (как в Base UI); id и вид задаются функциями.

export interface OptionProps<Item> {
  /** Уникальный id элемента: ключ списка и сравнение выбранного. По умолчанию `String(item)`. */
  getOptionId?: (item: Item) => string | number;
  /** Что показать в триггере. По умолчанию id. */
  getValueView?: (item: Item) => ReactNode;
  /** Содержимое ячейки списка, например `<Select.OptionContent prefix suffix subtext>`. По умолчанию как в триггере. */
  getOptionView?: (item: Item) => ReactNode;
  /** Элемент нельзя выбрать. */
  isOptionDisabled?: (item: Item) => boolean;
}
