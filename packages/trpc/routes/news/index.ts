import { getHackerNewsController } from "../../controllers/news/getHackerNews";
import { trpc } from "../../initTRPC";

export const newsRouter = trpc.router({
    getHackerNews: getHackerNewsController
});
