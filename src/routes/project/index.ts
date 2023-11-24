import { Router } from "express";
import authorizationRouter from "./authorization";
import employeeRouter from "./employee";
import proposeRouter from "./propose";
import resourceRouter from "./resource";
import { default as _RouterProject } from "./project";
import workRouter from "./work";
import reportRouter from "./report";

const projectRouter = Router();

projectRouter.use("/", _RouterProject);
projectRouter.use("/authorization", authorizationRouter);
projectRouter.use("/employee", employeeRouter);
projectRouter.use("/propose", proposeRouter);
projectRouter.use("/resource", resourceRouter);
projectRouter.use("/work", workRouter);
projectRouter.use("/report", reportRouter);

export default projectRouter;
