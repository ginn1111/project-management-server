import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import {
	addProposeResource,
	getDetail,
	getList,
	getListProposeResource,
	propose,
	review,
	reviewProposeResource,
	getListDepartment,
} from "../../controllers/project/propose";
import { generateId } from "../../utils/generate-id";
import { isInProject } from "../../middlewares/in-project";
import { doneProject } from "../../middlewares/done-project";
import { isStopUsingResource } from "../../middlewares/is-stop-using-resource";

const prismaClient = new PrismaClient();

const proposeRouter = Router();

proposeRouter.get("/list", getList);
proposeRouter.get("/list/head-department", getListDepartment);
proposeRouter.post("/", doneProject, propose);
proposeRouter.post("/:id/review", doneProject, review);
proposeRouter.get("/:id/review", getDetail);

proposeRouter.post("/random/state-propose", async (_, res: Response) => {
	const statePropose = [
		{
			id: generateId("STAT"),
			name: "Đợi duyệt",
		},
		{
			id: generateId("STAT"),
			name: "Đã duyệt",
		},
		{
			id: generateId("STAT"),
			name: "Từ chối",
		},
	];

	await prismaClient.statePropose.createMany({ data: statePropose });

	return res.json("ok");
});

// propose resource
proposeRouter.get("/resource/:id/review", getListProposeResource);
proposeRouter.post(
	"/resource/create",
	isInProject,
	doneProject,
	isStopUsingResource,
	addProposeResource,
);
proposeRouter.post("/resource/:id/review", reviewProposeResource);

export default proposeRouter;
