import { Router } from "express";
import {
	addManageProject,
	getPermissionOfProject,
} from "../../controllers/project/authorization";

const authorizationRouter = Router();

authorizationRouter.get("/:idProject/permission", getPermissionOfProject);
authorizationRouter.post("/:idProject/add-manage", addManageProject);

export default authorizationRouter;
