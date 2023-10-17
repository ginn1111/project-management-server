import { Router } from "express";

import employeeRoute from "./employee";
import projectRouter from "./project";
import accountRouter from "./account";
import departmentRouter from "./department";
import positionRouter from "./position";
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

export default router;
