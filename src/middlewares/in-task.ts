import { PrismaClient } from "@prisma/client";
import { ITaskOfWorkRequest } from "../@types/request";
import { NextFunction, Response } from "express";

const prismaClient = new PrismaClient();

export const isInTask = async (
	req: ITaskOfWorkRequest,
	res: Response,
	next: NextFunction,
) => {
	const { idTaskOfWork } = req.params;
	const { idTaskOfWork: _idTaskOfWork } = req.body ?? {};
	try {
		if (!idTaskOfWork && !_idTaskOfWork)
			return res.status(422).json("isInTask invalid parameter");

		const existTaskOfWork = await prismaClient.tasksOfWork.findFirst({
			where: {
				id: idTaskOfWork || _idTaskOfWork,
			},
			include: {
				employee: {
					include: {
						employee: {
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
						},
					},
				},
			},
		});

		// update task of login's emp!
		if (
			existTaskOfWork?.employee?.employee?.proposeProject?.employeesOfDepartment
				?.employee?.id !== res.locals.idEmpLogin &&
			!res.locals.headOrCreator
		) {
			return res.status(409).json("Nhân viên không có quyền sửa");
		}
		res.locals.existTaskOfWork;
		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
