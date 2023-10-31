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
} from "../../controllers/project/propose";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

const proposeRouter = Router();

proposeRouter.get("/list", getList);
proposeRouter.post("/", propose);
proposeRouter.post("/:id/review", review);
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
proposeRouter.post("/resource/:idEmpProject/create", addProposeResource);
proposeRouter.post("/resource/:id/review", reviewProposeResource);

export default proposeRouter;
