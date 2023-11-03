import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { generateId } from "../../utils/generate-id";

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

export const generateResourceType = async (_: unknown, res: Response) => {
	const resourceTypes = [
		{
			id: generateId("RETY"),
			name: "Vật tư",
		},
		{
			id: generateId("RETY"),
			name: "Công cụ",
		},
		{
			id: generateId("RETY"),
			name: "Nguyên liệu",
		},
	];
	try {
		await prismaClient.resourceType.createMany({
			data: resourceTypes,
		});

		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
