import { Router } from "express";
import {
	getList,
	getDetail,
	addNew,
	remove,
	update,
} from "../controllers/employee";

const employeeRouter = Router();

employeeRouter.get("/", getList);
employeeRouter.get("/:id", getDetail);
employeeRouter.post("/add", addNew);
employeeRouter.delete("/:id/remove", remove);
employeeRouter.patch("/:id/update", update);

export default employeeRouter;
