import * as trpc from "@trpc/server";
import { Context } from "context";
import superjson from "superjson";

export const createRouter = () => {
    return trpc.router<Context>();
};
