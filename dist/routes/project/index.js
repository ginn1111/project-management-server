"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = __importDefault(require("./authorization"));
const employee_1 = __importDefault(require("./employee"));
const propose_1 = __importDefault(require("./propose"));
const resource_1 = __importDefault(require("./resource"));
const work_1 = __importDefault(require("./work"));
const projectRouter = (0, express_1.Router)();
projectRouter.use("/", projectRouter);
projectRouter.use("/authorization", authorization_1.default);
projectRouter.use("/employee", employee_1.default);
projectRouter.use("/propose", propose_1.default);
projectRouter.use("/resource", resource_1.default);
projectRouter.use("/work", work_1.default);
exports.default = projectRouter;
