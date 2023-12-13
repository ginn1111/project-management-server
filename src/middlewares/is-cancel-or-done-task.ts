import { NextFunction, Response } from "express";
import { ITaskOfWorkRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isCancelOrDoneTask = async (
	req: ITaskOfWorkRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { idTask, idTaskOfWork } = req.params;
		if (!idTask && !idTaskOfWork)
			return res.status(422).json("invalid parameters");

		let task;

		if (idTask) {
			task = await prisma.task.findFirst({
				where: {
					id: idTask,
				},
			});
		} else if (idTaskOfWork) {
			const tOfW = await prisma.tasksOfWork.findFirst({
				where: {
					id: idTaskOfWork,
				},
				include: {
					task: true,
				},
			});

			task = tOfW?.task;
		}

		if (!task) return res.status(409).json("Công việc không tồn tại");

		if (!task?.isActive) return res.status(409).json("Công việc đã bị huỷ");

		const tOfW = await prisma.tasksOfWork.findFirst({
			where: {
				idTask: task.id,
			},
		});

		if (tOfW?.finishDate)
			return res
				.status(409)
				.json("Công việc đã hoàn thành, không thể chỉnh sửa");

		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
