import { Router } from "express";
import { getList, remove } from "../../controllers/project/employee";
import { isInProject } from "../../middlewares/in-project";

const employeeRouter = Router();

employeeRouter.get("/:id", isInProject, getList);
employeeRouter.post("/:idEmpProject/remove", remove);

export default employeeRouter;
