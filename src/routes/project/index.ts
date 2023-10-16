import { Router } from "express";
import authorizationRouter from "./authorization";
import employeeRouter from "./employee";
import proposeRouter from "./propose";
import resourceRouter from "./resource";
import workRouter from "./work";

const projectRouter = Router();

projectRouter.use("/", projectRouter);
projectRouter.use("/authorization", authorizationRouter);
projectRouter.use("/employee", employeeRouter);
projectRouter.use("/propose", proposeRouter);
projectRouter.use("/resource", resourceRouter);
projectRouter.use("/work", workRouter);

export default projectRouter;
