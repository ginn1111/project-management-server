import { Router } from "express";
import {
	getList,
	add,
	update,
	createTask,
	updateTask,
	assign,
	history,
} from "../../controllers/project/work";
import { isInProject } from "../../middlewares/in-project";

const workRouter = Router();

workRouter.get("/:id", getList);
workRouter.post("/:id/create", add);
workRouter.post("/:idWorkProject/update", update);
workRouter.get("/:idWorkProject/history", history);
// task
workRouter.post("/:idWork/task/create", isInProject, createTask);
workRouter.patch("/:idTasksOfWork/task/update", isInProject, updateTask);
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
