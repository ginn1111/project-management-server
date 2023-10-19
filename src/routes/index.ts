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
// import { verifyToken } from "../middlewares/authorization";

const router = Router();

router.use("/project", projectRouter);
router.use("/account", accountRouter);
router.use("/department", departmentRouter);
router.use("/employee", employeeRoute);
router.use("/position", positionRouter);
router.use("/resource", resourceRouter);
router.use("/statistic", statisticRouter);

router.get("/utils/provinces", getProvinces);
router.get("/utils/districts/:id", getDistricts);
router.get("/utils/wards/:id", getWards);

export default router;
