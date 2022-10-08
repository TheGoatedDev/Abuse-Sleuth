import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createContext } from "../../context";
import { appRouter } from "../../index";

export const CreateTRPCAPIHandler = () =>
    createNextApiHandler({
        router: appRouter,
        createContext,
        batching: {
            enabled: true,
        },
    });
