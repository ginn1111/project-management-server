import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import {
	addResource,
	detail,
	getList,
	update,
	done,
} from "../../controllers/project/project";
import { generateId } from "../../utils/generate-id";
import { addNew } from "../../controllers/project/project";
import { isInProject } from "../../middlewares/in-project";
import { IProjectRequest } from "../../@types/request";
import { doneProject } from "../../middlewares/done-project";

const primaClient = new PrismaClient();

const projectRouter = Router();

projectRouter.get("/", getList);
projectRouter.post("/:id/done", doneProject, done);
projectRouter.get("/:id", detail);
projectRouter.post("/add", addNew);
projectRouter.get(
	"/:id/in-project",
	isInProject,
	(req: IProjectRequest, res: Response) => {
		return res.json(req.params.id);
	},
);

projectRouter.post("/:id/add-resource", doneProject, addResource);

projectRouter.patch("/:id/update", doneProject, update);
projectRouter.post("/random", async (_, res: Response) => {
	const projects = Array(10)
		.fill(0)
		.map(() => ({
			id: generateId("PROJ"),
			name: faker.internet.displayName(),
			createdDate: faker.date.anytime(),
			finishDateET: faker.date.anytime(),
		}));

	await primaClient.project.createMany({
		data: projects,
	});

	return res.json("ok");
});

export default projectRouter;
