import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prismaClient = new PrismaClient();

export const getPermissionOfWork = async (_: unknown, res: Response) => {
	try {
		const permissionsOfWork = await prismaClient.permissionWork.findMany();
		return res.json({ permissions: permissionsOfWork });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const getPermissionOfProject = async (_: unknown, res: Response) => {
	try {
		const permissionsOfProject =
			await prismaClient.permissionsProject.findMany();
		return res.json({ permissions: permissionsOfProject });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
