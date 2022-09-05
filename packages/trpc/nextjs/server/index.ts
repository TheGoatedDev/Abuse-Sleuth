import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createContext } from "../../context";
import { appRouter } from "../../routes";

export const CreateTRPCAPIHandler = () =>
    createNextApiHandler({
        router: appRouter,
        createContext,
        batching: {
            enabled: true,
        },
    });
