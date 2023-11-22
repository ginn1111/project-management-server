import { Router } from "express";
import {
	statisticProject,
	statisticWork,
	statisticProjectOfEmployee,
} from "../controllers/project/statistic";

const statisticRouter = Router();

statisticRouter.get("/project", statisticProject);
statisticRouter.get("/work/:id", statisticWork);
statisticRouter.get("/employee", statisticProjectOfEmployee);

export default statisticRouter;
