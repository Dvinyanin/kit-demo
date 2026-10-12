import { createContext } from "react";

import type { IconName } from "../../icons";

export type { IconName };

export const IconContext = createContext<Record<IconName, string> | undefined>(undefined);
