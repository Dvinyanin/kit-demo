# UI-Kit — Требования и архитектура

## Контекст

UI-kit — библиотека React-компонентов для внутренних проектов TrueEngineering. Реализует дизайн-систему, описанную в Figma (подключается позже). Публикуется как приватный npm-пакет, потребляется несколькими внутренними приложениями.

Цель первого этапа: настроить рабочее окружение и создать прототип на одном компоненте (Select), чтобы зафиксировать подходы к разработке до массового наполнения кита.

## Технический стек

| Роль                      | Инструмент          | Примечание                                             |
| ------------------------- | ------------------- | ------------------------------------------------------ |
| Язык                      | TypeScript + React  | Строгая типизация, export типов в пакете               |
| Пакетный менеджер         | pnpm                | —                                                      |
| Toolchain                 | Vite+ (`vp` CLI)    | Unified: Vite, Vitest, tsdown, Oxlint, Oxfmt           |
| Сборка библиотеки         | `vp pack` (tsdown)  | ESM + CJS, dts, tree-shaking                           |
| Тесты                     | Vitest              | Через `vp test`                                        |
| Linting                   | Oxlint              | Через `vp check`                                       |
| Playground / документация | Storybook           | Интегрируется рядом с Vite                             |
| UI-примитивы              | Base UI             | Поведение и a11y без стилей. Документация: base-ui.com |
| Публикация                | Приватный npm-пакет | Registry не настроен, пока `npm pack` локально         |

## Архитектура разработки

**Структура пакета** — один пакет (не монорепо). Все компоненты экспортируются через один barrel-энтрипоинт `src/index.ts`. Импорт в проекте-потребителе: `import { Select } from '@trueengineering/kit'`.

**Стилизация** — CSS Modules + CSS Custom Properties. Токены из Figma организованы в два слоя:

- `src/theme/colors.css` — примитивы (полная палитра: neutral, green, teal, blue, orange, red, violet, yellow)
- `src/theme/tokens.css` — семантические токены (`--bg-*`, `--border-*`, `--texticon-*`, `--icon-*`, `--effects-*` и др.), ссылаются на примитивы через `var()`

Компоненты используют семантические токены напрямую через `var(--token-name)` в `*.module.css`. Утилитарные CSS-классы по токенам (`composes: bg-surface`) — не используются пока (рассматривались, отложено).

**Форматы вывода** — ESM + CJS + TypeScript declarations (`.d.ts`). Конфигурируется в `vite.config.ts` в блоке `pack`:

```ts
export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    dts: true,
    format: ["esm", "cjs"],
  },
});
```

**Storybook** запускается дополнительно, не входит в пакет при сборке. Story-файлы лежат рядом с компонентом (`Select.stories.tsx`).

**Versioning** — semver вручную, changelog ведётся вручную. Автоматизация (changesets) может быть добавлена позже.

## Прототип: Select

**Compound Component pattern** — потребитель сам собирает Select из частей под свой кейс, не передавая большой props-объект.

**API прототипа:**

```tsx
<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value placeholder="Выберите..." />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="one">Пункт 1</Select.Item>
    <Select.Item value="two">Пункт 2</Select.Item>
  </Select.Content>
</Select.Root>
```

**Состав компонентов:**

| Компонент        | Ответственность                 |
| ---------------- | ------------------------------- |
| `Select.Root`    | Контекст, состояние open/value  |
| `Select.Trigger` | Кнопка открытия                 |
| `Select.Value`   | Отображение выбранного значения |
| `Select.Content` | Дропдаун-обёртка                |
| `Select.Item`    | Отдельный пункт                 |

**Не входит в scope прототипа** (добавить позже):

- Поиск / фильтрация
- Multi-select
- Группировка опций
- Виртуализация длинных списков

## Открытые вопросы

- [ ] Ссылка на Figma дизайн-систему
