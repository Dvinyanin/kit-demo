# Select: состояние и план

Публичный API, модель и решения: [docs/specs/select-api.md](../../../docs/specs/select-api.md). Визуальные спеки: `docs/specs/select-default.md` (триггер), `select-dropdown-simple.md` (список), `select-multiple.md` (мультивыбор). Процесс: [docs/figma-workflow.md](../../../docs/figma-workflow.md).

Источники Figma: Components `BWW9MBiu5dHwUb8ENACEmi`, Showcase `GmAU0pPfs0WxcKNJyApuD0`.

## Структура

```
Select/          Select; истории Components/Selects/Select (+ States, Cells по Showcase)
MultiSelect/     MultiSelect
SelectCompact/   SelectCompact, SelectCompactTrigger (текст и шеврон без рамки)
base/            SelectCore (оболочка: Root, значение, сброс; триггер через `renderTrigger`, список через `children`),
                 SelectTrigger (триггер с подписью), SelectPopup (окно списка), SelectItem (ячейка, OptionContent), SelectIcon, options.ts
```

Четыре роли: оболочка (`SelectCore`), триггер (`SelectTrigger`, `SelectCompactTrigger`), список (`SelectPopup` и ячейки `SelectItem`/`MultiSelectItem`, его собирает адаптер в `children` оболочки), адаптер (`Select`, `MultiSelect`, `SelectCompact`: `options` → ячейки). Слоя `*.Base` нет.

## Сделано

- [x] `Select`, `MultiSelect`, `SelectCompact`: управляемые, по `options`, явные пропсы, без внутреннего состояния; все три на `SelectCore`
- [x] Триггер Default и Micro: состояния, иконки слева/справа, суффикс, очистка, подпись, Required (спека + сверка)
- [x] Read Only не открывает список; ширина по родителю
- [x] Список Dropdown Simple, Default и Micro (спека + сверка)
- [x] Мультивыбор: значения строкой, ячейка с чекбоксом (спека + сверка)
- [x] Значение — сам элемент списка; `options` любого вида, `getOptionId`/`getValueView`/`getOptionView`/`isOptionDisabled`; ячейка через `OptionContent` (prefix, suffix, subtext)
- [x] Типы в пространстве имён компонента (`Select.Props`, …)
- [x] Скриншотные тесты сеток, открытых списков и поведения Read Only / очистки

## Дальше (по решению откладывается)

- [ ] Публичный экспорт `SelectCore`, `SelectTrigger`, `Item` (сборка из частей); `name`, `id` у `Select`
- [ ] Подпись и ошибка вынести из `SelectTrigger` в обёртку поля
- [ ] `AsyncSelect`, `AsyncMultiSelect`, `isLoading`/`hasMore`/`loadMore`; контракт `fetchOptions`
- [ ] Группы, разделители, вложенность (удалены до спеки); `Grouped` поля из Showcase
- [ ] Пустой список «Не найдено», ограничение высоты списка (252/220)
- [ ] Ячейка Status (StatusTag как отдельный компонент)
- [ ] Спека и сверка `SelectCompact` с макетом; узкий выпадающий список `SelectCompact`
- [ ] `ComboBox` (поиск): отдельный компонент и спека
- [ ] Select Multiple с тегами (другой триггер), Dropdown Advanced (Multi)
- [ ] Тёмная тема (сетки и списки в тёмной теме)
- [ ] Доступность: видимый фокус триггера, `aria-invalid` / `aria-describedby`
- [ ] Кнопка «More» в подписи ошибки
