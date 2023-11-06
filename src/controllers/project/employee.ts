import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { IEmployeeProjectRequest } from "../../@types/request";

const prismaClient = new PrismaClient();

export const getList = async (req: IEmployeeProjectRequest, res: Response) => {
	const { id } = req.params;
	const { page, limit, idDepartment } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;
	try {
		const totalItems = await prismaClient.employeesOfProject.count({
			where: {
				...(idDepartment
					? {
							proposeProject: {
								employeesOfDepartment: {
									idDepartment,
								},
							},
					  }
					: {}),
				idProject: id,
				idProposeProject: {
					not: res.locals.empOfProject.idProposeProject,
				},
				endDate: null,
			},
		});

		const employeesOfProject = await prismaClient.employeesOfProject.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				...(idDepartment
					? {
							proposeProject: {
								employeesOfDepartment: {
									idDepartment,
								},
							},
					  }
					: {}),
				idProject: id,
				endDate: null,
				idProposeProject: {
					not: res.locals.empOfProject.idProposeProject,
				},
			},
			include: {
				proposeProject: {
					include: {
						employeesOfDepartment: {
							include: {
								department: true,
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
		return res.status(500).json("Server error");
	}
};

export const remove = async (req: IEmployeeProjectRequest, res: Response) => {
	const { idEmpProject } = req.params;
	try {
		if (!idEmpProject) return res.status(422).json("invalid parameter");

		const removeEmpOfProject = await prismaClient.employeesOfProject.update({
			where: {
				id: idEmpProject,
				endDate: null,
			},
			data: {
				endDate: new Date().toISOString(),
			},
		});

		return res.json(removeEmpOfProject);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Nhân viên đã bị xoá khỏi dự án!");
	}
};
