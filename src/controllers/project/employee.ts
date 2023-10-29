import { Response } from "express";
import { IEmployeeProjectRequest } from "../../@types/request";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getList = async (req: IEmployeeProjectRequest, res: Response) => {
	const { id } = req.params;
	const { page, limit } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;
	try {
		const totalItems = await prismaClient.employeesOfProject.count({
			where: {
				idProject: id,
			},
		});

		const employeesOfProject = await prismaClient.employeesOfProject.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				idProject: id,
			},
			include: {
				proposeProject: {
					include: {
						employeesOfDepartment: {
							include: {
								employee: true,
							},
						},
					},
				},
			},
		});

		return res.json({ employeesOfProject, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
