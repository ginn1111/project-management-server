import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import { getList, update } from "../../controllers/project/project";
import { generateId } from "../../utils/generate-id";
import { addNew } from "../../controllers/project/project";

const primaClient = new PrismaClient();

const projectRouter = Router();

projectRouter.get("/", getList);
projectRouter.post("/add", addNew);
projectRouter.patch("/:id/update", update);
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
