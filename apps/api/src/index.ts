import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

const PORT = parseInt(process.env.PORT as string) || 3001;

app.get("/", (req, res) => {
    res.send("HELLO");
});

app.get("/hello", (req, res) => {
    res.send("HEY THERE 123");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
