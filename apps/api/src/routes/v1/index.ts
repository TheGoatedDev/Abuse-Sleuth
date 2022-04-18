import { Router } from "express";

import authenticateController from "./auth/authenticate";

const v1Router = Router();

v1Router.get("/", (req, res) => {
    res.status(200).send("Hello from the v1 route!");
});

v1Router.use("/auth/authenticate", authenticateController);

export default v1Router;
