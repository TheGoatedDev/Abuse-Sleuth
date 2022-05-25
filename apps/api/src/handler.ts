import compression from "compression";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import serverless from "serverless-http";

import v1Router from "./routes/v1";

const app = express();

app.use(cookieParser());
app.use(helmet());

app.use("/v1", v1Router);

app.get("/hello", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "Hello from path!",
    });
});

app.get("/token", (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token").status(200).json({
        message: "Hello from cookie!",
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

export const handler = serverless(app);
