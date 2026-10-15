import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  pack: {
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    dts: {
      generator: "tsgo",
    },
    exports: true,
  },
  test: {
    projects: [
      {
        extends: true,
        test: { name: "unit", include: ["tests/**/*.test.ts"] },
      },
      {
        extends: true,
        test: {
          name: "visual",
          include: ["src/**/*.test.tsx"],
          setupFiles: ["tests/setup.visual.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            viewport: { width: 1000, height: 800 },
          },
        },
      },
    ],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      "arrow-body-style": "error",
    },
  },
  fmt: {
    sortImports: {
      groups: [
        ["type-import", "value-builtin", "value-external"],
        ["type-internal", "value-internal"],
        [
          "type-parent",
          "type-sibling",
          "type-index",
          "value-parent",
          "value-sibling",
          "value-index",
        ],
        "style",
      ],
    },
  },
});
