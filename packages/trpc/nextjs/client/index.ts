import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import { AppRouter } from "../../routes";

const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return "";
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpcClient = createTRPCNext<AppRouter>({
    config({}) {
        const url = `${getBaseUrl()}/api/trpc`;
        return {
            url,
            transformer: superjson,
            links: [
                // adds pretty logs to your console in development and logs errors in production
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url,
                }),
            ],
        };
    },
});
