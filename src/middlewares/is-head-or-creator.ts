import { NextFunction, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const isHeadOrCreator = async (
	req: any,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params;
	const { idProject } = req?.body ?? {};
	try {
		if (!idProject && !id)
			return res
				.status(422)
				.json("head-or-creator middleware invalid parameters");

		const manageProject = await prismaClient.manageProject.findFirst({
			where: {
				endDate: null,
				idProject: id || idProject,
				idEmpHead: res.locals.idEmpLogin,
			},
		});

		if (!manageProject) {
			return res.status(409).json("Bạn không có quyền thao tác");
		}

		next();
	} catch (error) {
		console.log(error);
		console.log("isHeadOrCreator error");
	}
};
