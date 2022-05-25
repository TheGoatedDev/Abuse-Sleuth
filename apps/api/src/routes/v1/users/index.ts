import { Router } from "express";

const v1UserRouter = Router();

// GET REQUESTS

// Get All Users (Admin Required)
v1UserRouter.get("/", (req, res) => {
    res.json({
        message: "Hello from V1 User Get All!",
    });
});

// Get Self User (User Required)
v1UserRouter.get("/self", (req, res) => {
    res.json({
        message: "Hello from V1 User Get Self!",
    });
});

// Get Single User (Admin Required)
v1UserRouter.get("/:userId", (req, res) => {
    res.json({
        message: "Hello from V1 User Get Single!",
    });
});

// POST REQUESTS

// Register User (Nothing Required)
v1UserRouter.post("/", (req, res) => {});

export { v1UserRouter };
export default v1UserRouter;
