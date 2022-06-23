import { createReactQueryHooks } from "@trpc/react";

import { AppRouter } from "@abuse-sleuth/trpc";

export const trpc = createReactQueryHooks<AppRouter>();
