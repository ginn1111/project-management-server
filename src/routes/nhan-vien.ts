import { Router } from "express";
import {
	getList,
	getDetail,
	addNew,
	remove,
	update,
} from "../controllers/nhan-vien";

const employeeRoute = Router();

employeeRoute.get("/", getList);
employeeRoute.get("/:id", getDetail);
employeeRoute.post("/add", addNew);
employeeRoute.delete("/:id/remove", remove);
employeeRoute.patch("/:id/update", update);

export default employeeRoute;
