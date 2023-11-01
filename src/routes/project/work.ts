import { Router } from "express";
import {
	getList,
	add,
	update,
	createTask,
	updateTask,
	assign,
} from "../../controllers/project/work";

const workRouter = Router();

workRouter.get("/:id", getList);
workRouter.post("/:id/create", add);
workRouter.post("/:idWorkProject/update", update);
// task
workRouter.post("/:idEmployeeInWork/task/create", createTask);
workRouter.patch("/:idTasksOfWork/task/update", updateTask);
// assignment
workRouter.post("/:idWorksProject/assign", assign);

// export const assign = async (req: ITaskOfWorkRequest, res: Response) => {
// 	try {
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json("Server error");
// 	}
// };

export default workRouter;
