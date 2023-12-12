import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import {
	addResource,
	detail,
	getList,
	update,
	done,
	addEmployees,
	cancel,
} from "../../controllers/project/project";
import { generateId } from "../../utils/generate-id";
import { addNew } from "../../controllers/project/project";
import { isInProject } from "../../middlewares/in-project";
import { IProjectRequest } from "../../@types/request";
import { doneProject } from "../../middlewares/done-project";
import { isHeadOrCreator } from "../../middlewares/is-head-or-creator";

const primaClient = new PrismaClient();

const projectRouter = Router();

projectRouter.get("/", getList);
projectRouter.post("/:id/add/employees", addEmployees);
projectRouter.post("/:id/done", isHeadOrCreator, doneProject, done);
projectRouter.get("/:id", detail);
projectRouter.post("/add", addNew);
projectRouter.get(
	"/:id/in-project",
	isInProject,
	(req: IProjectRequest, res: Response) => {
		const isHeadOrCreator = !!res.locals.headOrCreator;
		return res.json({ idProject: req.params.id, isHeadOrCreator });
	},
);

projectRouter.post(
	"/:id/add-resource",
	isHeadOrCreator,
	doneProject,
	addResource,
);

projectRouter.patch("/:id/update", isHeadOrCreator, doneProject, update);
projectRouter.put("/:id/cancel", isHeadOrCreator, doneProject, cancel);
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
