import Express from "express";

const app = Express();

app.all("/", (req, res) => {
    res.send("OOF");
});

const start = async () => {
    try {
        await app.listen(3001, () => {
            console.log("Server Started");
        });
    } catch (error) {}
};

start();

export {};
