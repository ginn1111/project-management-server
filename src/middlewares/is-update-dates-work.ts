import { NextFunction, Response } from "express";
import { ITaskOfWorkRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";
import { WorkStateNames } from "../migrations/work-state";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export const isUpdateDatesWork = async (
	req: ITaskOfWorkRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { idWorkProject } = req.params;

		if (!idWorkProject) return res.status(422).json("invalid parameters");

		const workOfProject = await prisma.worksOfProject.findFirst({
			where: {
				id: idWorkProject,
			},
			include: {
				worksOfEmployee: {
					include: {
						tasksOfWork: {
							where: {
								task: {
									isActive: true,
								},
							},
						},
					},
				},
				work: true,
			},
		});

		if (!workOfProject) {
			return res.status(409).json("Đầu việc đã bị huỷ hoặc không tồn tại");
		}

		const isChangeDates =
			!dayjs(workOfProject.startDate).isSame(req.body?.startDate, "D") ||
			!dayjs(workOfProject.finishDateET).isSame(req.body?.finishDateET, "D");

		const hasTask = workOfProject.worksOfEmployee.some(
			(wOfEmp) => wOfEmp.tasksOfWork.length,
		);

		if (hasTask && isChangeDates) {
			return res
				.status(409)
				.json("Đầu việc đã có công việc, không thể chỉnh sửa ngày");
		}

		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
