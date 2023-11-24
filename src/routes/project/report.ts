import { getList, addNew } from "../../controllers/project/report";
import { Router } from "express";
import { doneProject } from "../../middlewares/done-project";
import { isInProject } from "../../middlewares/in-project";

const reportRouter = Router();

reportRouter.get("/:id", getList);
reportRouter.post("/:id/add", isInProject, doneProject, addNew);

export default reportRouter;
