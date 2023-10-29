import { Response } from "express";
import { IWorkProjectRequest } from "../../@types/request";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getList = async (req: IWorkProjectRequest, res: Response) => {
	const { id } = req.params;
	try {
		const worksOfProject = await prismaClient.worksOfProject.findMany({
			where: {
				idProject: id,
			},
			include: {
				worksOfEmployee: {
					include: {
						tasksOfWork: true,
					},
				},
				work: true,
			},
		});

		return res.json(worksOfProject);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
