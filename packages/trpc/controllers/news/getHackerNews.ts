import Parser from "rss-parser";
import { z } from "zod";

import { trpc } from "../../initTRPC";

//
export const getHackerNewsController = trpc.procedure
    .input(
        z.object({
            limit: z.number().optional(),
        })
    )
    .query(async ({ ctx, input }) => {
        const parser = new Parser();

        const feed = await parser.parseURL(
            "https://feeds.feedburner.com/TheHackersNews"
        );

        return {
            ...feed,
            items: feed.items.slice(0, input.limit ?? 3),
        };
    });
