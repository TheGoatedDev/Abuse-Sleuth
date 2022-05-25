import { application, Router } from "express";

import v1UserRouter from "./users";

const v1Router = Router();

v1Router.use("/users", v1UserRouter);

export { v1Router };
export default v1Router;
