import { Request, Response, Router } from "express";

import {
	getDistricts,
	getProvinces,
	getWards,
} from "../controllers/utils/address";
import { initialSystem } from "../controllers/utils/initial-system";
import { getPermissionOfWork } from "../controllers/utils/permission";
import {
	generateRankEvaluationWork,
	getRankEvaluationWork,
} from "../controllers/utils/rank-evaluation";
import {
	generateResourceType,
	getResourceType,
} from "../controllers/utils/resource-type";
import { verifyToken } from "../middlewares/authorization";
import { generateId } from "../utils/generate-id";
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
import customerRouter from "./customer";

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
router.use("/customer", verifyToken, customerRouter);

router.get("/utils/rank-evaluation-work", getRankEvaluationWork);
router.get("/utils/rank-evaluation-work/random", generateRankEvaluationWork);
router.get("/utils/resource-type/gen", generateResourceType);
router.get("/utils/resource-type", getResourceType);
router.get("/utils/provinces", getProvinces);
router.get("/utils/districts/:id", getDistricts);
router.get("/utils/wards/:id", getWards);
router.get("/utils/permission/work", getPermissionOfWork);
router.get("/utils/generate-id", (_: unknown, res: Response) =>
	res.json(generateId("")),
);
router.post("/initial-system", async (req: Request, res: Response) => {
	try {
		const { secret } = req.body ?? {};
		if (!secret || secret !== "thuandz")
			return res.status(422).json("invalid parameter");
		await initialSystem();

		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
});

export default router;
