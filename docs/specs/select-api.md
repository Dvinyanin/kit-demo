# Select: публичный API и структура

Описывает, из каких компонентов состоит семейство Select, что получает пользователь библиотеки и как это лежит в `src/components/Select/`. Визуальные спеки отдельных частей: [select-default.md](select-default.md) (триггер), [select-dropdown-simple.md](select-dropdown-simple.md) (список), [select-multiple.md](select-multiple.md) (мультивыбор).

Статус: от 2026-10-15; реализовано `Select`, `MultiSelect`, `SelectCompact`. Остальное в §7.

## 1. Модель: четыре роли

| Роль                       | Что знает                                                                                                 | Кто                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Оболочка**               | значение, `multiple`, очистка, Read Only; триггер получает через `renderTrigger`, список через `children` | `SelectCore`                                                    |
| **Триггер** (их несколько) | только внешний вид                                                                                        | `SelectTrigger` (поле), `SelectCompactTrigger`; позже чипсы     |
| **Список**                 | окно списка, ячейки, содержимое ячейки                                                                    | `SelectPopup`, `SelectItem`, `MultiSelectItem`, `OptionContent` |
| **Адаптер**                | `options` → ячейки, значение ↔ `onChange`                                                                 | `Select`, `MultiSelect`, `SelectCompact`                        |

Адаптер собирает оболочку, триггер и список: список он кладёт в `SelectCore` как `children` (`<SelectPopup size>…ячейки…</SelectPopup>`), поэтому настройки списка (размер, позже шапка, подвал, ширина) задаются там, где вызывается оболочка, а `SelectCore` про список ничего не знает. Составного слоя `*.Base` нет (удалён 2026-10-15): кому нужны `children` или собственные стили ячейки, берёт `SelectCore` + `SelectTrigger` + `Item` напрямую (пример: ячейка со статусом в `Components/Selects/Select/Cells`). Эти части пока внутренние (не экспортируются из `src/index.ts`).

## 2. Решения

Приняты 2026-10-15:

1. **Адаптеры.** `Select` и `MultiSelect`: управляемые, готовые к использованию, принимают `options`. `SelectCompact`: тот же API, что у `Select`, но триггер без рамки и без размера Micro. `ComboBox`: отдельный компонент для поиска.
2. **Без внутреннего состояния.** Значение всегда приходит снаружи (`value`, `onChange`), `defaultValue` нет. Исключений нет: очистка тоже идёт через `onChange`.
3. **Пустое значение** это `undefined` (для `MultiSelect` пустой массив при очистке, `undefined` на входе). `null` в публичном API не используется. Преобразование `null` ↔ `undefined` делает `SelectCore`: Base UI получает `null` и `[]`, наружу уходит `undefined` и `[]`.
4. **Значение поля — сам элемент списка** (как в Base UI): `options` это любой массив (строки, числа, объекты), `value` и `onChange` работают с элементами, а не с id. Подпись выбранного значения всегда есть (она в самом элементе). Тип значения не ограничен строкой.
5. **Функции вместо полей** (`OptionProps`): `getOptionId(item)` (`string | number`, по умолчанию `String`: ключ списка и сравнение выбранного), `getValueView(item)` (что показать в триггере, `ReactNode`, по умолчанию id), `getOptionView(item)` (содержимое ячейки списка, `ReactNode`, по умолчанию `getValueView`), `isOptionDisabled(item)`. Для строк и чисел функции не нужны.
6. **Слоты ячейки** (префикс, суффикс, подпись под текстом) даёт компонент `Select.OptionContent` (`MultiSelect.OptionContent`, `SelectCompact.OptionContent`), который возвращается из `getOptionView`. `prefix` (код или иконка `<Select.Icon />`) считается текстом, остальное оформляет потребитель. Пустые слоты проверяет `isReactNodeNotEmpty`.
7. **В `MultiSelect`** значения в триггере: `getValueView` каждого выбранного через запятую (агрегат вроде «выбрано 3» пока нельзя). Действия (выбрать всё, футер) не делаем.
8. **Плоские экспорты:** `Select`, `MultiSelect`, `SelectCompact`, позднее `AsyncSelect`, `AsyncMultiSelect`. Статические поля: `Icon`, `OptionContent`.
9. **Типы лежат в пространстве имён компонента** (как в Base UI): `Select.Props<Item>`, `MultiSelect.Props<Item>`, `SelectCompact.Props<Item>`. Отдельных экспортов типов из `src/index.ts` нет.
10. **Пропсы адаптеров не наследуют пропсы Base UI.** Только перечисленные в §3 (поля триггера, `disabled`, `required`, `readOnly`, `value`, `onChange`, `options`, функции списка). Нужное из Base UI (`name`, `id`, форма) добавляется по мере необходимости: пока `Select` не участвует в отправке нативной формы.
11. **Кликабельные иконки** задаются компонентом `Select.Icon` (`MultiSelect.Icon`) прямо в `iconLeft` и `iconRight`. Триггер всегда `div` (внутри бывают кнопки).
12. **Группы, разделители, вложенность** не поддерживаются до спеки (`Dropdown [Nested]`, Group Header). Секция Showcase `Grouped` тоже не делается.
13. **Read Only** не открывает список (ни мышью, ни клавиатурой) и не меняет значение.
14. **Ошибка:** `invalid` окрашивает поле, `error` (`ReactNode`) выводит подпись ошибки и по умолчанию включает `invalid`.
15. **Поиск и фильтрация** только в `ComboBox`, в `Select` их нет.
16. **Загрузка** (`isLoading`, `hasMore`, `loadMore`) и `Async`-обёртки пока не делаем; контракт `fetchOptions` проектируется вместе с `Async`.
17. **Доступность** (видимый фокус триггера, `aria-invalid` и `aria-describedby` для ошибки и подписи) пока не делаем.
18. **Ширина** поля задаётся только родителем: поле растягивается на 100%.

## 3. Публичный API

```tsx
<Select<User>
  options={users}                         // любой массив: строки, числа, объекты
  value={user}                            // User | undefined (сам элемент)
  onChange={(user) => …}                  // (user: User | undefined) => void, undefined при очистке
  getOptionId={(u) => u.id}               // string | number; по умолчанию String(item)
  getValueView={(u) => u.name}            // триггер; по умолчанию id
  getOptionView={(u) => (                 // ячейка списка; по умолчанию как в триггере
    <Select.OptionContent prefix="643" suffix="₽" subtext="RUB">{u.name}</Select.OptionContent>
  )}
  isOptionDisabled={(u) => u.locked}      // необязательно
  // поля триггера, общие с MultiSelect:
  label placeholder caption error invalid required disabled readOnly size
  iconLeft iconRight suffix clearable clearLabel    // иконка: имя или <Select.Icon type onClick label />
/>

<Select options={["Москва", "Казань"]} value={city} onChange={setCity} />   // строки без функций

<MultiSelect
  value={users}                          // User[] | undefined
  onChange={(users) => …}                // (users: User[]) => void, [] при очистке
  options={users} getOptionId getValueView getOptionView isOptionDisabled
  …поля триггера                         // в триггере getValueView каждого выбранного через запятую
/>

<SelectCompact
  value onChange options getOptionId getValueView getOptionView isOptionDisabled   // как у Select
  placeholder fontStyle="default" | "bold" disabled
/>
```

`Select.OptionContent`: `prefix` (код или иконка `<Select.Icon type="…" />`), `suffix`, `subtext`, `children` (текст).

## 4. Структура директории

```
src/components/Select/
  Select/          Select; истории Components/Selects/Select (+ States, Cells по Showcase), тесты
  MultiSelect/     MultiSelect, MultiSelectItem (ячейка с чекбоксом); истории Components/Selects/MultiSelect
  SelectCompact/   SelectCompact, SelectCompactTrigger (текст и шеврон без рамки); истории Components/Selects/SelectCompact
  base/            SelectCore (оболочка), SelectTrigger (поле), SelectPopup (окно списка), SelectItem (ячейка, OptionContent), SelectIcon, options.ts
  index.ts
  PLAN.md
```

Старая заглушка `Select` (Root, Trigger, Content, Item из Initial commit) удалена. Составные `SelectDefault`/`SelectMultiple`, а затем слой `Select.Base` убраны (breaking, решено, пока библиотека не вышла).

## 5. Соответствие старым именам

| Было                                                   | Стало                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `SelectDefault` / `SelectMultiple` (children)          | `Select` / `MultiSelect` с `options`; составной вариант: `SelectCore` + `SelectTrigger` + `Item` |
| `SelectOption {value,label,subtext,…}`, `SelectProps`  | `options` любого вида + `getOptionId`/`getValueView`/`getOptionView`; `Select.Props`             |
| `Item subtext suffix code iconLeft`                    | `<OptionContent subtext suffix prefix>` в `getOptionView`                                        |
| `SelectCompact` (children, `defaultValue`, `multiple`) | `SelectCompact` с `options`; мультивыбора нет                                                    |
| `*.Group`, `*.NestedGroup`, `*.Separator`              | удалены до спеки                                                                                 |
| `onIconRightClick`, `iconRightLabel`                   | `<Select.Icon type onClick label />` в `iconRight`                                               |
| значение `null` при очистке                            | `undefined` в `Select`, `[]` в `MultiSelect`                                                     |

## 6. Проверка

- `vp check` и `vp test` проходят.
- Скриншотные тесты (`*.test.tsx` рядом с компонентами, Vitest browser mode): сетки `Components/Selects/Select/States` (все истории, включая `All slots`, `Caption`, `Required`), типы ячеек списка `Components/Selects/Select/Cells` (открытый список), закрытый `Select` с иконками, открытый список `Select` (Default, Micro, `OptionContent`, пользовательская ячейка), `MultiSelect` (открытый список Default и Micro, пустой), `SelectCompact` (закрытые состояния).
- Поведенческие тесты: Read Only не открывает список и не вызывает `onChange` (мышь и клавиатура), очистка вызывает `onChange(undefined)` и не открывает список.
- Найдена и исправлена ошибка: при заданной функции вида значения (тогда называлась `renderValue`) текст плейсхолдера не показывался (Base UI приоритет отдаёт `children`). Теперь `SelectTrigger` всегда сам рисует значение и сам подставляет плейсхолдер для пустого значения.

## 7. Не сделано (по решению)

- `isLoading`, `hasMore`, `loadMore`, состояние загрузки, ошибка с повтором.
- `AsyncSelect` и `AsyncMultiSelect`. Контракт `fetchOptions` (курсор или страница, форма ответа, момент загрузки, отмена гонок) определяется при разработке.
- **Подпись значения вне загруженных `options`.** Значение теперь сам элемент (п. 4), поэтому подпись приходит вместе с ним. Остаётся вопрос формы редактирования: она должна получить элемент, а не id (например, запрос по id перед показом). Обсуждается вместе с `Async`.
- Группы, разделители, вложенность; ячейка Status как отдельный компонент; пустой список «Не найдено»; ограничение высоты списка; тёмная тема; кнопка «More» в подписи ошибки.
- Доступность (п. 17).
- Публичный экспорт `SelectCore`, `SelectTrigger`, `Item` для сборки из частей и пропсы вроде `name`, `id` у `Select`.
- Подпись и ошибка в отдельной обёртке поля, чтобы они не входили в `SelectTrigger` (нужно для `SelectCompactTrigger` и чипсов, где их нет).
- `ComboBox` не трогали: отдельный компонент со своим кодом.
- Спека и сверка `SelectCompact` с макетом (`8768-6926`), узкий выпадающий список `SelectCompact` (ширина по триггеру).
