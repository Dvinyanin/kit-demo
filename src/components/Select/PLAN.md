# Select: состояние и план

Публичный API и решения: [docs/specs/select-api.md](../../../docs/specs/select-api.md). Визуальные спеки: `docs/specs/select-default.md` (триггер), `select-dropdown-simple.md` (попап), `select-multiple.md` (мультивыбор). Процесс: [docs/figma-workflow.md](../../../docs/figma-workflow.md).

Источники Figma: Components `BWW9MBiu5dHwUb8ENACEmi`, Showcase `GmAU0pPfs0WxcKNJyApuD0`.

## Структура

```
Select/          Select (options) + Select.Base
MultiSelect/     MultiSelect (options) + MultiSelect.Base
SelectCompact/   инлайн-триггер без рамки
base/            SelectBase, MultiSelectBase, SelectField (триггер), SelectShared (попап, ячейки)
```

Общее (`base/SelectField`, `base/SelectShared`) выделено после того, как стало видно дублирование между Default, Multiple и Compact. Составные API `Select.Base`/`MultiSelect.Base` остаются для кастомных случаев.

## Сделано

- [x] `Select`, `MultiSelect`: управляемые, по `options`, без внутреннего состояния
- [x] `Select.Base`, `MultiSelect.Base`: составной API (Item, Group, NestedGroup, Separator)
- [x] Триггер Default и Micro: состояния, иконки слева/справа, суффикс, очистка (спека + сверка)
- [x] Попап Dropdown Simple, Default и Micro (спека + сверка)
- [x] Мультивыбор: значения строкой, ячейка с чекбоксом (спека + сверка)
- [x] `SelectCompact` (сделан до процесса со спеками, не сверен)

## Дальше (по решению откладывается)

- [ ] `AsyncSelect`, `AsyncMultiSelect`, `isLoading`/`hasMore`/`loadMore`; контракт `fetchOptions`; подпись значения вне загруженных `options`
- [ ] Группы, разделители, вложенность: отдельный вид или композиция из `*.Base`
- [ ] Пустой список «Не найдено», ограничение высоты списка (252/220)
- [ ] Ячейка Status (StatusTag как отдельный компонент)
- [ ] Сверка `SelectCompact` со спекой
- [ ] `ComboBox` (поиск): отдельный компонент и спека
- [ ] Select Multiple с тегами (другой триггер), Dropdown Advanced (Multi)
- [ ] Тёмная тема
