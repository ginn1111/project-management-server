import { Router } from "express";
import { getList } from "../../controllers/project/employee";

const employeeRouter = Router();
employeeRouter.get("/:id", getList);

export default employeeRouter;
