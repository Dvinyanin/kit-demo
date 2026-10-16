import { Select as BaseSelect } from "@base-ui/react/select";
import type { ReactNode } from "react";

// В Read Only поле только отображает значение: Base UI даёт открыть список для просмотра, а нам это не нужно
const cancelOpen: NonNullable<BaseSelect.Root.Props<string>["onOpenChange"]> = (open, details) => {
  if (open) details.cancel();
};

/** Значение основы: элемент или `undefined` (одиночный выбор), массив (`multiple`). Base UI получает `null` и `[]`. */
type SelectCoreValue<Value, Multiple extends boolean> = Multiple extends true
  ? Value[]
  : Value | undefined;

export interface SelectCoreApi {
  /** Сбрасывает значение через `onChange` (`undefined`, при `multiple` `[]`). */
  clear: () => void;
}

export interface SelectCoreProps<Value, Multiple extends boolean = false> extends Omit<
  BaseSelect.Root.Props<Value, Multiple>,
  "defaultValue" | "onOpenChange" | "onValueChange" | "value"
> {
  /**
   * Selected value (an array when `multiple`). The select is always controlled:
   * `undefined` means nothing is selected, changes arrive through `onChange`.
   */
  value?: SelectCoreValue<Value, Multiple>;
  /** Called with the new value: `undefined` (an empty array when `multiple`) when the selection is cleared */
  onChange?: (value: SelectCoreValue<Value, Multiple>) => void;
  /** Renders the trigger (e.g. `<SelectTrigger … />`); the core knows nothing about its props. The popup goes into `children` (`<SelectPopup>`) */
  renderTrigger: (api: SelectCoreApi) => ReactNode;
}

/**
 * Общая основа Select и MultiSelect: Root Base UI, управляемое значение и сброс.
 * Вид триггера задаёт `renderTrigger`, список (`SelectPopup`) приходит в `children`. Наружу не экспортируется, пользователи работают с обёртками.
 */
export function SelectCore<Value, Multiple extends boolean = false>({
  children,
  renderTrigger,
  value,
  onChange,
  ...rootProps
}: SelectCoreProps<Value, Multiple>) {
  const { multiple, readOnly } = rootProps;

  // Base UI хранит пустое значение как `null` (`[]` при multiple), наружу отдаём `undefined`
  const emptyValue = (multiple ? [] : undefined) as SelectCoreValue<Value, Multiple>;

  return (
    <BaseSelect.Root
      {...rootProps}
      value={(value ?? (multiple ? [] : null)) as BaseSelect.Root.Props<Value, Multiple>["value"]}
      onValueChange={(next) => onChange?.((next ?? undefined) as SelectCoreValue<Value, Multiple>)}
      onOpenChange={readOnly ? cancelOpen : undefined}
    >
      {renderTrigger({ clear: () => onChange?.(emptyValue) })}
      {children}
    </BaseSelect.Root>
  );
}
