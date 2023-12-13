import { NextFunction, Response } from "express";
import { IWorkProjectRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";
import { WorkStateNames } from "../migrations/work-state";

const prisma = new PrismaClient();

export const isCancelOrDoneWork = async (
	req: IWorkProjectRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { idWorkProject } = req.params;
		if (!idWorkProject) return res.status(422).json("invalid parameter");

		const workOfProj = await prisma.worksOfProject.findFirst({
			where: {
				id: idWorkProject,
			},
			include: {
				work: {
					include: {
						state: true,
					},
				},
			},
		});

		if (!workOfProj?.work)
			return res.status(409).json("Đầu việc không tồn tại");

		if (workOfProj.work.state?.name === WorkStateNames.Canceled)
			return res.status(409).json("Đầu việc đã bị huỷ");
		if (workOfProj.work.state?.name === WorkStateNames.Done)
			return res.status(409).json("Đầu việc đã hoàn thành");

		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
