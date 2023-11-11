import { NextFunction, Request, Response } from "express";
import { IWorkProjectRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";
import { isEmpty } from "lodash";

const prismaClient = new PrismaClient();

export const isInProject = async (
	req: IWorkProjectRequest,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params;
	const { idProject } = req.body ?? {};
	if (!idProject && !id)
		return res.status(422).json("in-project middleware invalid parameters");

	try {
		// normal emp
		const empOfProject = await prismaClient.employeesOfProject.findFirst({
			where: {
				idProject: id || idProject,
				proposeProject: {
					employeesOfDepartment: {
						idEmployee: res.locals.idEmpLogin,
					},
				},
				endDate: null,
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

		// is head or creator of employee
		const headOrCreator = await prismaClient.manageProject.findFirst({
			where: {
				endDate: null,
				idProject,
				idEmpHead: res.locals.idEmpLogin,
			},
			include: {
				employee: true,
			},
		});

		if (isEmpty(empOfProject) && isEmpty(headOrCreator)) {
			return res.status(409).json("Bạn không có trong dự án này");
		}

		res.locals.empOfProject = empOfProject;
		res.locals.headOrCreator = headOrCreator;

		next();
	} catch (error) {
		return res.status(500).json("Server error");
	}
};
