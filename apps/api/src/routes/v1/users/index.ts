import { Router } from "express";

import { prisma } from "@abuse-sleuth/prisma";

const v1UserRouter = Router();

// GET REQUESTS

// Get All Users (Admin Required)
v1UserRouter.get("/", async (req, res) => {
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const users = await prisma.user.findMany({
        select: {
            email: true,
            userRole: true,
            createdAt: true,
        },
        skip,
        take: limit,
    });

    res.json({
        data: users,
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

// Create User (Admin Required)
v1UserRouter.post("/", (req, res) => {});

export { v1UserRouter };
export default v1UserRouter;
