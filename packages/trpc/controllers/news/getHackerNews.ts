import Parser from "rss-parser";
import { trpc } from "../../initTRPC";

export const getHackerNewsController = trpc.procedure.query(async () => {
    const parser = new Parser();

    const feed = await parser.parseURL("https://feeds.feedburner.com/TheHackersNews");

    return {
        ...feed,
        items: feed.items.slice(0,5),
    }
})
