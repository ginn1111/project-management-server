import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import { addNew, getList, update, toggleUsing } from "../controllers/resource";
import { generateId } from "../utils/generate-id";

const prismaClient = new PrismaClient();

const resourceRouter = Router();

resourceRouter.get("/", getList);
resourceRouter.patch("/:id", update);
resourceRouter.post("/add", addNew);
resourceRouter.put("/:id/toggle-using", toggleUsing);
resourceRouter.post("/random", async (_, res: Response) => {
	const resourceType = [
		{
			id: generateId("TYPE"),
			name: faker.internet.displayName(),
		},
		{
			id: generateId("TYPE"),
			name: faker.internet.displayName(),
		},
		{
			id: generateId("TYPE"),
			name: faker.internet.displayName(),
		},
	];
	await prismaClient.resourceType.createMany({ data: resourceType });

	const resource = Array(10)
		.fill(0)
		.map(() => ({
			id: generateId("RESO"),
			amount: 100,
			name: faker.internet.displayName(),
			idResourceType: resourceType[Math.floor(Math.random() * 3)].id,
		}));

	const createdResource = await prismaClient.resource.createMany({
		data: resource,
	});

	return res.json(createdResource);
});

export default resourceRouter;
