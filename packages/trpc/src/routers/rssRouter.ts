import { TRPCError } from "@trpc/server";
import Parser from "rss-parser";

import { createRouter } from "../utils/createRouter";

const parser = new Parser();
const router = createRouter();

const rssRouter = router.query("hackernews", {
    async resolve({ input, ctx }) {
        let feed = await parser.parseURL(
            "http://feeds.feedburner.com/TheHackersNews"
        );

        return feed;
    },
});

export default rssRouter;
