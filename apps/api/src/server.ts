import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotENV from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";

const ENVPATH = path.resolve(__dirname, "../../../", ".env");
const env = dotENV.config({ path: ENVPATH });

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

const v1Router = require("./routes/v1").default;

app.use("/v1", v1Router);

app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

export default app;

//TODO: Make Port a ENV Variable
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});
