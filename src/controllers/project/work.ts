import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty, omit } from "lodash";
import {
	ITaskOfWorkRequest,
	IWorkOfEmpRequest,
	IWorkProjectRequest,
} from "../../@types/request";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

export const getList = async (req: IWorkProjectRequest, res: Response) => {
	const { id } = req.params;
	try {
		const worksOfProject = await prismaClient.worksOfProject.findMany({
			where: {
				idProject: id,
			},
			include: {
				worksOfEmployee: {
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
						tasksOfWork: {
							include: {
								task: true,
							},
						},
					},
				},
				work: true,
			},
		});

		return res.json(worksOfProject);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const add = async (req: IWorkProjectRequest, res: Response) => {
	const { id } = req.params;
	const { name, startDate, finishDateET, note } = req.body ?? {};
	try {
		if (!id || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const createdWork = await prismaClient.worksOfProject.create({
			data: {
				id: generateId("WOPR"),
				note,
				startDate: startDate && new Date(startDate).toISOString(),
				finishDateET: finishDateET && new Date(finishDateET).toISOString(),
				project: {
					connect: {
						id,
					},
				},
				work: {
					create: {
						id: generateId("WORK"),
						name,
					},
				},
			},
		});

		return res.json(createdWork);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const update = async (req: IWorkProjectRequest, res: Response) => {
	const { idWorkProject } = req.params;
	const { name, startDate, finishDateET, note } = req.body ?? {};
	try {
		if (!idWorkProject || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const workOfProject = await prismaClient.worksOfProject.findFirst({
			where: {
				id: idWorkProject,
			},
			include: {
				work: true,
			},
		});

		const _updateWork = Object.assign({}, omit(workOfProject, "work"), {
			startDate: startDate ? new Date(startDate) : undefined,
			finishDateET: finishDateET ? new Date(finishDateET) : undefined,
			note,
		});

		const updatedWork = await prismaClient.worksOfProject.update({
			where: {
				id: idWorkProject,
			},
			data: {
				..._updateWork,
			},
		});

		if (name) {
			await prismaClient.work.update({
				where: {
					id: workOfProject?.idWork!,
				},
				data: {
					...workOfProject?.work,
					name,
				},
			});
		}
		return res.json(updatedWork);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

// for task
export const createTask = async (req: ITaskOfWorkRequest, res: Response) => {
	const { idEmployeeInWork } = req.params;
	const { startDate, finishDateET, name, note } = req.body ?? {};
	if (!idEmployeeInWork || isEmpty(req.body))
		return res.status(409).json("invalid parameter");

	try {
		const createdTaskOfWork = await prismaClient.tasksOfWork.create({
			data: {
				id: generateId("TAWO"),
				startDate: startDate ? new Date(startDate).toISOString() : undefined,
				finishDateET: finishDateET
					? new Date(finishDateET).toISOString()
					: undefined,
				note,
				employee: {
					connect: {
						id: idEmployeeInWork,
					},
				},
				task: {
					create: {
						id: generateId("TASK"),
						name,
					},
				},
			},
		});

		return res.json(createdTaskOfWork);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const updateTask = async (req: ITaskOfWorkRequest, res: Response) => {
	const { idTasksOfWork } = req.params;
	const { name, startDate, finishDateET, note } = req.body ?? {};
	console.log(idTasksOfWork, req.body);
	try {
		if (!idTasksOfWork || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const existTaskOfWork = await prismaClient.tasksOfWork.findFirst({
			where: {
				id: idTasksOfWork,
			},
		});

		const _updatedTaskOfWork = Object.assign(
			{},
			omit(existTaskOfWork, ["idTask", "idEmployee"]),
			{
				note,
				startDate: startDate ? new Date(startDate).toISOString() : undefined,
				finishDateET: finishDateET
					? new Date(finishDateET).toISOString()
					: undefined,
			},
		);

		const updatedTaskOfWork = await prismaClient.tasksOfWork.update({
			where: {
				id: idTasksOfWork,
			},
			data: {
				..._updatedTaskOfWork,
				task: {
					update: {
						name,
					},
				},
			},
		});

		return res.json(updatedTaskOfWork);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

// assign
export const assign = async (req: IWorkOfEmpRequest, res: Response) => {
	const { idWorksProject } = req.params;
	const { idProject, idEmployee } = req.body ?? {};
	try {
		if (!idWorksProject || isEmpty(req.body))
			return res.status(409).json("invalid parameters");
		const employeeOfProject = await prismaClient.employeesOfProject.findFirst({
			where: {
				idProject,
				proposeProject: {
					employeesOfDepartment: {
						employee: {
							id: idEmployee,
						},
					},
				},
				endDate: null,
			},
		});

		if (!employeeOfProject?.id) {
			return res.status(422).json("Nhân viên của dự án không tồn tại!");
		}

		const createdAssign = await prismaClient.worksOfEmployee.create({
			data: {
				id: generateId("WOEM"),
				idEmployee: employeeOfProject!.id,
				idWorksProject,
			},
		});

		return res.json(createdAssign);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
