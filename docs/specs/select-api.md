# Select: публичный API и структура

Описывает, из каких компонентов состоит семейство Select, что получает пользователь библиотеки и как это лежит в `src/components/Select/`. Визуальные спеки отдельных частей: [select-default.md](select-default.md) (триггер), [select-dropdown-simple.md](select-dropdown-simple.md) (попап), [select-multiple.md](select-multiple.md) (мультивыбор).

Статус: от 2026-10-15; реализовано `Select`, `MultiSelect`, `Select.Base`, `MultiSelect.Base`, `SelectCompact`. Остальное в §6.

## 1. Решения

Приняты 2026-10-15:

1. **Слои.** `Select` и `MultiSelect`: управляемые, готовые к использованию, без композиции, принимают `options`. `Select.Base` и `MultiSelect.Base`: те же поля с составным API через `children` для кастомных случаев (группы, разделители, вложенность). `SelectCompact`: отдельный компонент (у него нет размера Micro). `ComboBox`: отдельный компонент для поиска.
2. **Без внутреннего состояния.** Значение всегда приходит снаружи (`value`, `onChange`), `defaultValue` нет. Исключений нет: очистка тоже идёт через `onChange`.
3. **Пустое значение** это `undefined` (для `MultiSelect` пустой массив при очистке, `undefined` на входе). `null` в публичном API не используется. В `*.Base` остаются имена Base UI (`value`, `onValueChange`, `null`).
4. **Плоские экспорты:** `Select`, `MultiSelect`, позднее `AsyncSelect`, `AsyncMultiSelect`. Вложенные пространства имён (`Select.Multi.Async`) не делаем: неудобны для дженериков. Единственное статическое поле: `.Base`.
5. **Группы, разделители, вложенность** не входят в `options`: либо отдельный вид компонента, либо потребитель собирает список из `Select.Base.*`.
6. **Поиск и фильтрация** только в `ComboBox`, в `Select` их нет.
7. **Мультивыбор:** значения строкой через запятую; действия (выбрать всё, футер) не делаем.
8. **Загрузка** (`isLoading`, `hasMore`, `loadMore`) и `Async`-обёртки пока не делаем; контракт `fetchOptions` проектируется вместе с `Async`.

## 2. Публичный API

```tsx
interface SelectOption<V extends string = string> {
  value: V;
  label: string;
  subtext?: string;
  suffix?: string;
  code?: string;
  icon?: IIcon;
  disabled?: boolean;
}

<Select
  value={value}                          // V | undefined
  onChange={(v) => …}                    // (v: V | undefined) => void, undefined при очистке
  options={options}
  renderOption={(option) => node}        // содержимое ячейки (например StatusTag)
  renderValue={(option) => node}         // что показать в триггере; по умолчанию label
  // поля триггера, общие с MultiSelect и *.Base:
  label placeholder caption error required disabled readOnly size
  iconLeft iconRight onIconRightClick iconRightLabel suffix clearable clearLabel
/>

<MultiSelect
  value={values}                         // V[] | undefined
  onChange={(vs) => …}                   // (vs: V[]) => void, [] при очистке
  options={options}                      // value, label, icon, disabled
  renderValue={(selectedOptions) => node} // по умолчанию подписи через запятую
  …поля триггера
/>
```

`Select.Base` и `MultiSelect.Base`: компонент с `children`; части `Item`, `Group`, `NestedGroup`, `Separator` (для `MultiSelect.Base` `Item` это ячейка с чекбоксом). Это бывшие `SelectDefault` и `SelectMultiple` без изменений поведения, кроме именования.

Что `Select` делает сверх `Select.Base`: превращает `options` в ячейки, по умолчанию показывает `label` выбранной опции, переводит `null` Base UI в `undefined`.

## 3. Структура директории

```
src/components/Select/
  Select/          Select (options) + Select.Base, истории Components/Select
  MultiSelect/     MultiSelect (options) + MultiSelect.Base, истории Components/MultiSelect
  SelectCompact/   инлайн-триггер без рамки
  base/            SelectBase, MultiSelectBase, SelectField (внутренний триггер), SelectShared (попап, ячейки)
                   и истории Figma-сверки (Components/Select/Base, Components/MultiSelect/Base)
  index.ts
  PLAN.md
```

Старая заглушка `Select` (Root, Trigger, Content, Item из Initial commit) удалена. Составной API `SelectDefault`/`SelectMultiple` заменён на `Select.Base`/`MultiSelect.Base` (breaking, решено, пока библиотека не вышла).

## 4. Соответствие старым именам

| Было                                      | Стало                                        |
| ----------------------------------------- | -------------------------------------------- |
| `SelectDefault` (children)                | `Select.Base`                                |
| `SelectDefault.Item`                      | `Select.Base.Item`                           |
| `SelectMultiple` (children)               | `MultiSelect.Base`                           |
| `SelectMultiple.Item` / `MultiSelectItem` | `MultiSelect.Base.Item`                      |
| `SelectDefaultProps<V>`                   | `SelectBaseProps<V>`                         |
| `Select` (заглушка Root/Trigger/…)        | удалена                                      |
| значение `null` при очистке               | `undefined` в `Select`, `[]` в `MultiSelect` |

## 5. Проверка

- `vp check` и `vp test` проходят (`tests/index.test.ts` пока заглушка без зависимости от компонентов).
- Storybook: `Components/Select` (Playground, Micro, Subtext/suffix/code, Icons + clear, Custom option), `Components/MultiSelect` (Playground, Micro, Empty); истории Figma-сверки перенесены под `Components/Select/Base/*` и `Components/MultiSelect/Base`.
- Выбор опции вызывает `onChange` с новым значением, очистка с `undefined` (мульти: `[]`), недоступная опция не выбирается, пользовательская опция (`renderOption`) и значение в триггере (`renderValue`) работают; плейсхолдер показывается для пустого значения.
- Найдена и исправлена ошибка: при заданном `renderValue` текст плейсхолдера не показывался (Base UI приоритет отдаёт `children`). Теперь `SelectField` сам подставляет плейсхолдер для пустого значения.

## 6. Не сделано (по решению)

- `isLoading`, `hasMore`, `loadMore`, состояние загрузки, ошибка с повтором.
- `AsyncSelect` и `AsyncMultiSelect`. Контракт `fetchOptions` (курсор или страница, форма ответа, момент загрузки, отмена гонок) определяется при разработке.
- **Подпись значения, которого нет в загруженных `options`.** Пример: форма редактирования получает `value="am"`, а в первых загруженных 20 опциях «Армении» нет, поэтому триггер покажет `am`. Решение понадобится вместе с `Async` (например `selectedOption`, или запрос по значению).
- Группы, разделители, вложенность в `options`; ячейка Status как отдельный компонент; пустой список «Не найдено»; ограничение высоты списка; тёмная тема.
- `ComboBox` не трогали: отдельный компонент со своим кодом.
- Решение про `SelectCompact` (остаётся отдельным компонентом) пока без спеки: он сделан до процесса со спеками.
