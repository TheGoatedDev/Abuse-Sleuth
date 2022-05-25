"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.handler = void 0;
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var serverless_http_1 = __importDefault(require("serverless-http"));
var app = (0, express_1["default"])();
app.use((0, cookie_parser_1["default"])());
app.use((0, helmet_1["default"])());
app.get("/", function (req, res, next) {
    return res.status(200).json({
        message: "Hello from root!"
    });
});
app.get("/hello", function (req, res, next) {
    return res.status(200).json({
        message: "Hello from path!"
    });
});
app.get("/token", function (req, res, next) {
    res.clearCookie("token").status(200).json({
        message: "Hello from cookie!"
    });
});
app.use(function (req, res, next) {
    return res.status(404).json({
        error: "Not Found"
    });
});
exports.handler = (0, serverless_http_1["default"])(app);
//# sourceMappingURL=handler.js.map