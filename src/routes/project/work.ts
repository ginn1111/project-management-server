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
	startWork,
	cancelWork,
	cancelTask,
} from "../../controllers/project/work";
import { isInProject } from "../../middlewares/in-project";
import { doneProject } from "../../middlewares/done-project";
import { isHeadOrCreator } from "../../middlewares/is-head-or-creator";
import { isInTask } from "../../middlewares/in-task";
import { isUpdateDatesWork } from "../../middlewares/is-update-dates-work";
import { isValidateCreateTask } from "../../middlewares/is-validate-date-task";
import { isCancelOrDoneTask } from "../../middlewares/is-cancel-or-done-task";

const workRouter = Router();

workRouter.get("/:id", isInProject, getList);
workRouter.post("/:id/create", doneProject, add);

workRouter.post(
	"/:idWorkProject/update",
	isInProject,
	isUpdateDatesWork,
	update,
);

workRouter.post("/:idWork/history", history);

workRouter.post("/:idWorkProject/done", done);

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
workRouter.post("/:idWorksProject/assign", isHeadOrCreator, assign);

//permission
workRouter.post("/:idWorkProject/permission", assignPermission);
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
