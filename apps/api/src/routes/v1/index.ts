import { application, Router } from "express";

import v1AuthRouter from "./auths";
import v1UserRouter from "./users";

const v1Router = Router();

v1Router.use("/users", v1UserRouter);
v1Router.use("/auths", v1AuthRouter);

export { v1Router };
export default v1Router;
