<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

# Project Rules

## Validation

Always use `vp check` for type checking, linting, and formatting — never `pnpm exec tsc --noEmit` or raw `tsc`. The Vite+ toolchain runs a more complete check; raw `tsc` has been observed to silently miss real type errors.

## Stack

- **Base UI** (`@base-ui/react`) — headless primitives for behaviour and a11y. No styles. Docs: https://base-ui.com
- **shadcn** — not a dependency. May be used as a code reference only.
- **Styling** — CSS Modules for component styles, CSS Custom Properties for tokens.
- **Storybook** — stories live next to the component (`Select.stories.tsx`). Not included in the built package.

## Theme

Entry points: `src/theme/index.ts` (JS) → `src/theme/index.css` (CSS) → imports `colors.css`, `tokens.css`, `typography.css`.

Two-level token system:

- `colors.css` — primitive palette tokens (`--blue-500`, `--gray-100`, ...)
- `tokens.css` — semantic tokens (`--texticon`, `--bg-surface`, `--border-active`, ...) referencing `colors.css`
- `typography.css` — global CSS classes for all type styles from Figma (`.body-medium-spacious`, `.header-h1`, ...)

Token naming follows Figma variable paths with slashes replaced by dashes. Example: Figma `effects/shadows/shadow-0_1` → CSS `--effects-shadows-shadow-0_1`. When two variables in different groups share the same last segment, always use the full path to avoid collisions. Public-facing tokens (used in components) drop the group prefix: `Shadow/shadow-0` → `--shadow-0`.

## Styling Rules

- **Never use raw colors** (`#fff`, `rgb(...)`, `rgba(...)`). Always use CSS custom properties from `tokens.css`.
- **Never use raw font sizes, weights, or line-heights**. Always use typography classes via `composes: <class> from global` in CSS Modules, or apply the class directly in HTML.
- **Never use raw `box-shadow` values**. Always use shadow tokens from `tokens.css`: `--shadow-0`, `--shadow-50`, `--shadow-100`, `--shadow-300`, `--shadow-500`, `--shadow-on-white-100/300/500`, `--shadow-popover-500`.

## Figma → Storybook workflow

Full process: [docs/figma-workflow.md](docs/figma-workflow.md). Read it before starting or verifying any component.

- **Order: spec → code → verification.** Build `docs/specs/<component>.md` (node map, state × element → token table, sizes, behaviour, open questions) and get it approved before writing code.
- **Two Figma files, different jobs.** Components (`BWW9…`) = library: variants (`State=…`), component props, token bindings. Showcase (`GmAU…`) = documentation: which states/content combinations exist, behaviour text, and `Guides` (paddings, gaps, animation). A Select is assembled from several pages (Field/trigger, Dropdown popup, Specificaton, Guides) — see §1 of the workflow doc.
- **Never infer tokens from screenshots.** Take them from `get_design_context` per state cell or per library variant. Icons come as SVG with hex — map back to a token including `fill-opacity` (e.g. `#95A0B3` @ 0.5 = `--texticon-disabled-alt`); mark ambiguous mappings with `?`.
- **Work at section level** (`_Section`). Whole spec pages are too large for `get_design_context`; use `get_metadata` on them only as a table of contents.
- **Verify by token names, not by eye:** Figma returns colors as `var(--token, …)` — the same names as in our CSS, so compare names per state × element against the component's `.module.css`. Geometry is checked by measuring in Storybook (Figma measures paddings from the outer edge, CSS padding from inside the 1px border — subtract it).
- **State stories mirror the Showcase grid 1:1** and contain only static states (Default, Error, Disabled, Read Only). Focus/Open/Hover are verified by clicking via Playwright, not shown in the grid.
- **Dark theme:** semantic tokens must not differ between Figma and our themes. If they do, report it as a Figma issue for the designer — don't adapt the code.
- **Temporary artifacts** (screenshots, Figma dumps, scratch scripts) go to `.tmp/` (gitignored), never into `docs/`. `docs/` holds only what gets committed: the workflow doc and component specs.

## Visual tests

- Screenshot tests run through `vp test` (Vitest browser mode, Playwright Chromium; `visual` project in `vite.config.ts`). Tests live next to the component as `*.test.tsx` and reuse stories via `composeStories`; Storybook decorators/theme come from `tests/setup.visual.ts`.
- One screenshot per matrix story (`AllVariants` with a `variant` arg: modes × sizes × default/disabled/icons). Baselines are in `__screenshots__/` next to the test and are platform-specific (`*-chromium-win32.png`); the project is local-only, no CI.
- A missing baseline is created on the first run (the test reports it as a failure by design). Review the new PNG, then re-run. After an intended visual change delete the stale PNG (or run `vp test run -u`) and review the diff.
- Static states only in the matrices: Hover/Focus are not covered. Select/MultiSelect popups are covered by tests that click the trigger and screenshot the whole page (the popup renders in a portal).
