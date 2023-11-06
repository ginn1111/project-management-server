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
	done,
	doneTask,
} from "../../controllers/project/work";
import { isInProject } from "../../middlewares/in-project";
import { doneProject } from "../../middlewares/done-project";

const workRouter = Router();

workRouter.get("/:id", getList);
workRouter.post("/:id/create",doneProject, add);
workRouter.post("/:idWorkProject/update", isInProject, update);
workRouter.post("/:idWorkProject/history", history);
workRouter.post("/:idWorkProject/done", done);
// task
workRouter.post("/:idWork/task/create", isInProject, createTask);
// update
workRouter.patch("/:idTasksOfWork/task/update", isInProject, updatedTask);
// read
workRouter.post("/:idTask/task/history", isInProject, historyOfTask);
workRouter.post("/:idTaskOfWork/task/done", doneTask);

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
