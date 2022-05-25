"use strict";
exports.__esModule = true;
exports.v1UserRouter = void 0;
var express_1 = require("express");
var v1UserRouter = (0, express_1.Router)();
exports.v1UserRouter = v1UserRouter;
// GET REQUESTS
// Get All Users (Admin Required)
v1UserRouter.get("/", function (req, res) {
    res.json({
        message: "Hello from V1 User Get All!"
    });
});
// Get Self User (User Required)
v1UserRouter.get("/self", function (req, res) {
    res.json({
        message: "Hello from V1 User Get Self!"
    });
});
// Get Single User (Admin Required)
v1UserRouter.get("/:userId", function (req, res) {
    res.json({
        message: "Hello from V1 User Get Single!"
    });
});
// POST REQUESTS
// Register User (Nothing Required)
v1UserRouter.post("/", function (req, res) { });
exports["default"] = v1UserRouter;
//# sourceMappingURL=index.js.map