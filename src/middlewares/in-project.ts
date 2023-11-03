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
	if (!idProject && !id) return res.status(422).json("invalid parameters");

	try {
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
		});

		if (isEmpty(empOfProject)) {
			return res.status(409).json("Bạn không có trong dự án này");
		}

		res.locals.idEmpProject = empOfProject.id;
		next();
	} catch (error) {
		return res.status(500).json("Server error");
	}
};
