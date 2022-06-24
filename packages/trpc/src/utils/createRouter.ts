import * as trpc from "@trpc/server";
import { Context } from "context";

export type RouterMeta = {
    requireAuth?: boolean;
};

export const createRouter = () => {
    return trpc.router<Context, RouterMeta>();
};
