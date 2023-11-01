import { Router } from "express";

import {
	getDistricts,
	getProvinces,
	getWards,
} from "../controllers/utils/address";
import accountRouter from "./account";
import departmentRouter from "./department";
import employeeRoute from "./employee";
import positionRouter from "./position";
import projectRouter from "./project";
import resourceRouter from "./resource";
import statisticRouter from "./statistic";
import certificateRouter from "./certificate";
import qualificationRouter from "./qualification";
import authenticationRouter from "./authentication";
import { verifyToken } from "../middlewares/authorization";
import { getResourceType } from "../controllers/utils/resource-type";

const router = Router();

router.use("/authentication", authenticationRouter);
router.use("/project", verifyToken, projectRouter);
router.use("/account", verifyToken, accountRouter);
router.use("/department", verifyToken, departmentRouter);
router.use("/certificate", verifyToken, certificateRouter);
router.use("/qualification", verifyToken, qualificationRouter);
router.use("/employee", verifyToken, employeeRoute);
router.use("/position", verifyToken, positionRouter);
router.use("/resource", verifyToken, resourceRouter);
router.use("/statistic", verifyToken, statisticRouter);

router.get("/utils/resource-type", getResourceType);
router.get("/utils/provinces", getProvinces);
router.get("/utils/districts/:id", getDistricts);
router.get("/utils/wards/:id", getWards);

export default router;
