import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prismaClient = new PrismaClient();

export const getResourceType = async (_: unknown, res: Response) => {
	try {
		const resourceTypes = await prismaClient.resourceType.findMany();

		return res.json(resourceTypes);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
