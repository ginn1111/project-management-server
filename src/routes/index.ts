import { Router } from "express";

import {
	getDistricts,
	getProvinces,
	getWards,
} from "../controllers/utils/address";
import {
	generateResourceType,
	getResourceType,
} from "../controllers/utils/resource-type";
import { verifyToken } from "../middlewares/authorization";
import accountRouter from "./account";
import authenticationRouter from "./authentication";
import certificateRouter from "./certificate";
import departmentRouter from "./department";
import employeeRoute from "./employee";
import positionRouter from "./position";
import projectRouter from "./project";
import qualificationRouter from "./qualification";
import resourceRouter from "./resource";
import statisticRouter from "./statistic";
import {
	getPermissionOfProject,
	getPermissionOfWork,
} from "../controllers/utils/permission";

const router = Router();

router.use("/authentication", authenticationRouter);
router.use("/project", verifyToken, projectRouter);
router.use("/account", accountRouter);
router.use("/department", departmentRouter);
router.use("/certificate", certificateRouter);
router.use("/qualification", qualificationRouter);
router.use("/employee", employeeRoute);
router.use("/position", positionRouter);
router.use("/resource", resourceRouter);
router.use("/statistic", statisticRouter);

router.get("/utils/resource-type/gen", generateResourceType);
router.get("/utils/resource-type", getResourceType);
router.get("/utils/provinces", getProvinces);
router.get("/utils/districts/:id", getDistricts);
router.get("/utils/wards/:id", getWards);
router.get("/utils/permission/work", getPermissionOfWork);
router.get("/utils/permission/project", getPermissionOfProject);

export default router;
