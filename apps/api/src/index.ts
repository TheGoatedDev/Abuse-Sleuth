import cors from "cors";
import dotENV from "dotenv";
import express from "express";

import rootRouter from "./routes/routes";

dotENV.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = parseInt(process.env.PORT as string) || 3001;

app.use("/", rootRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
