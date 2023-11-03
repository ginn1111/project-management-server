import { Router } from "express";
import {
	getList,
	add,
	update,
	createTask,
	updatedTask,
	assign,
	history,
	historyOfTask,
} from "../../controllers/project/work";
import { isInProject } from "../../middlewares/in-project";

const workRouter = Router();

workRouter.get("/:id", getList);
workRouter.post("/:id/create", add);
workRouter.post("/:idWorkProject/update", update);
workRouter.post("/:idWorkProject/history", history);
// task
// permission
// read
workRouter.post("/:idWork/task/create", isInProject, createTask);
// update
workRouter.patch("/:idTasksOfWork/task/update", isInProject, updatedTask);
// read
workRouter.post("/:idTask/task/history", isInProject, historyOfTask);

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
