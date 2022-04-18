import { Router } from "express";

import v1Router from "./v1";

const rootRouter = Router();

rootRouter.use("/v1", v1Router);

rootRouter.get("/", (req, res) => {
    res.status(200).send("Hello from the root route!");
});

export default rootRouter;
