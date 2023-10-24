import { Response, Router } from "express";
import { getList } from "../controllers/resource";
import { PrismaClient, Resource } from "@prisma/client";
import { generateId } from "../utils/generate-id";
import { faker } from "@faker-js/faker";

const prismaClient = new PrismaClient();

const resourceRouter = Router();

resourceRouter.get("/", getList);
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
