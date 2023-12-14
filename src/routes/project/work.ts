import { Router } from "express";
import {
	add,
	addResourceForTask,
	assign,
	assignPermission,
	cancelTask,
	cancelWork,
	createTask,
	done,
	doneTask,
	evaluateWork,
	getList,
	getWorkPermissions,
	history,
	historyOfTask,
	startWork,
	update,
	updatedTask,
} from "../../controllers/project/work";
import { doneProject } from "../../middlewares/done-project";
import { isInProject } from "../../middlewares/in-project";
import { isInTask } from "../../middlewares/in-task";
import { isCancelOrDoneTask } from "../../middlewares/is-cancel-or-done-task";
import { isCancelOrDoneWork } from "../../middlewares/is-cancel-or-done-work";
import { isHeadOrCreator } from "../../middlewares/is-head-or-creator";
import { isUpdateDatesWork } from "../../middlewares/is-update-dates-work";
import { isValidateCreateTask } from "../../middlewares/is-validate-date-task";

const workRouter = Router();

workRouter.get("/:id", isInProject, getList);
workRouter.post("/:id/create", doneProject, add);

workRouter.post(
	"/:idWorkProject/update",
	isInProject,
	isCancelOrDoneWork,
	isUpdateDatesWork,
	update,
);

workRouter.post("/:idWork/history", history);

workRouter.post("/:idWorkProject/done", isCancelOrDoneWork, done);

// task
workRouter.post(
	"/:idWork/task/create",
	isInProject,
	isValidateCreateTask,
	createTask,
);

// add resource
workRouter.post(
	"/:id/:idTask/task/add-resource",
	isInProject,
	isInTask,
	isCancelOrDoneTask,
	addResourceForTask,
);

// cancel
workRouter.put(
	"/:id/:idTask/task/cancel",
	isInProject,
	isInTask,
	isCancelOrDoneTask,
	cancelTask,
);

// update
workRouter.patch(
	"/:idTaskOfWork/task/update",
	isInProject,
	isInTask,
	isCancelOrDoneTask,
	updatedTask,
);

// read
workRouter.post("/:idTask/task/history", isInProject, historyOfTask);

// done task
workRouter.post(
	"/:idTaskOfWork/task/done",
	isInProject,
	isInTask,
	isCancelOrDoneTask,
	doneTask,
);

// assignment
workRouter.post(
	"/:idWorkProject/assign",
	isHeadOrCreator,
	isCancelOrDoneWork,
	assign,
);

//permission
workRouter.post(
	"/:idWorkProject/permission",
	isCancelOrDoneWork,
	assignPermission,
);

workRouter.get(
	"/:idWorkProject/permission/:idEmpProject/work",
	getWorkPermissions,
);

// evaluation
workRouter.post("/:idWorkOfProject/evaluation", isHeadOrCreator, evaluateWork);

// process state of work
workRouter.put("/:idWorkProject/start", startWork);
workRouter.put("/:idWorkProject/cancel", cancelWork);

export default workRouter;
