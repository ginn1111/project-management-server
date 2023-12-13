import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextFunction, Response } from "express";
import { ITaskOfWorkRequest } from "../@types/request";
import { WorkStateNames } from "../migrations/work-state";

const prisma = new PrismaClient();

export const isValidateCreateTask = async (
	req: ITaskOfWorkRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { idWork } = req.params;
		const { startDate, finishDateET } = req.body ?? {};
		if (!idWork) return res.status(409).json("invalid parameter");

		const wOfProj = await prisma.worksOfProject.findFirst({
			where: {
				id: idWork,
			},
			include: {
				work: {
					include: {
						state: true,
					},
				},
			},
		});

		if (!wOfProj?.work) return res.status(409).json("Đầu việc không tồn tại");

		const { work } = wOfProj ?? {};

		if (work?.state?.name === WorkStateNames.Canceled) {
			return res.status(409).json("Đầu việc đã huỷ, không thể tạo công việc");
		}

		if (work?.state?.name === WorkStateNames.Done) {
			return res
				.status(409)
				.json("Đầu việc đã hoàn thành, không thể tạo công việc");
		}

		const isValidFinishDateET = !dayjs(finishDateET).isAfter(
			wOfProj.finishDateET,
			"D",
		);

		if (!isValidFinishDateET) {
			return res
				.status(409)
				.json("Thời gian đầu việc đã thay đổi, vui lòng chọn lại");
		}

		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
