"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.v1Router = void 0;
var express_1 = require("express");
var users_1 = __importDefault(require("./users"));
var v1Router = (0, express_1.Router)();
exports.v1Router = v1Router;
v1Router.use("/users", users_1["default"]);
exports["default"] = v1Router;
//# sourceMappingURL=index.js.map