import { setProjectAnnotations } from "@storybook/react";

import * as preview from "../.storybook/preview";

// Темы, IconContext и глобалы из Storybook, чтобы истории в тестах выглядели как в сторибуке
setProjectAnnotations(preview.default);
