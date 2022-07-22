import Parser from "rss-parser";
import { z } from "zod";

import { createRouter } from "../utils/createRouter";

const parser = new Parser();
const router = createRouter();

const rssRouter = router.query("hackernews", {
    input: z.object({
        amount: z.number(),
        page: z.number(),
    }),
    async resolve({ input, ctx }) {
        let feed = await parser.parseURL(
            "http://feeds.feedburner.com/TheHackersNews"
        );

        return feed.items.slice(
            input.page * input.amount,
            input.page * input.amount + input.amount
        );
    },
});

export default rssRouter;
