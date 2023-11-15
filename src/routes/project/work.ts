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
	addResourceForTask,
	assignPermission,
	getWorkPermissions,
	evaluateWork,
} from "../../controllers/project/work";
import { isInProject } from "../../middlewares/in-project";
import { doneProject } from "../../middlewares/done-project";
import { isHeadOrCreator } from "../../middlewares/is-head-or-creator";
import { isInTask } from "../../middlewares/in-task";

const workRouter = Router();

workRouter.get("/:id", isInProject, getList);
workRouter.post("/:id/create", doneProject, add);
workRouter.post("/:idWorkProject/update", isInProject, update);
workRouter.post("/:idWork/history", history);
workRouter.post("/:idWorkProject/done", done);
// task
workRouter.post("/:idWork/task/create", isInProject, createTask);
workRouter.post(
	"/:id/:idTask/task/add-resource",
	isInProject,
	isInTask,
	addResourceForTask,
);
// update
workRouter.patch(
	"/:idTaskOfWork/task/update",
	isInProject,
	isInTask,
	updatedTask,
);
// read
workRouter.post("/:idTask/task/history", isInProject, historyOfTask);
workRouter.post("/:idTaskOfWork/task/done", isInProject, isInTask, doneTask);

// assignment
workRouter.post("/:idWorksProject/assign", isHeadOrCreator, assign);

//permission
workRouter.post("/:idWorkProject/permission", assignPermission);
workRouter.get(
	"/:idWorkProject/permission/:idEmpProject/work",
	getWorkPermissions,
);

// evaluation
workRouter.post("/:idWorkOfProject/evaluation", evaluateWork);

export default workRouter;
