"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const actions_1 = __importDefault(require("./routes/actions"));
const credits_1 = __importDefault(require("./routes/credits"));
const app = (0, express_1.default)();
const port = 3030;
// @TODO: Add middleware to log all requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/actions', actions_1.default);
app.use('/credits', credits_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
