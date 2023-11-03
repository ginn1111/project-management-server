import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty, omit, pick } from "lodash";
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
												department: true,
												employee: true,
											},
										},
									},
								},
							},
						},
						tasksOfWork: {
							include: {
								task: {
									include: {
										resourceOfTasks: true,
									},
								},
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

		// get exist work of project
		const workOfProject = await prismaClient.worksOfProject.findFirst({
			where: {
				id: idWorkProject,
			},
			include: {
				work: true,
			},
		});

		// update infor
		const _updateWork = Object.assign({}, omit(workOfProject, ["work"]), {
			startDate: startDate ? new Date(startDate) : undefined,
			finishDateET: finishDateET ? new Date(finishDateET) : undefined,
			note,
		});

		await prismaClient.$transaction(async (tx) => {
			// update
			const updatedWork = await tx.worksOfProject.update({
				where: {
					id: idWorkProject,
				},
				data: {
					..._updateWork,
				},
				include: {
					worksOfEmployee: true,
				},
			});

			if (name) {
				await tx.work.update({
					where: {
						id: workOfProject?.idWork!,
					},
					data: {
						...workOfProject?.work,
						name,
					},
				});
			}

			// get from middleware in-project
			const empOfProj = res.locals.empOfProject;

			const workOfEmp = updatedWork.worksOfEmployee.find(
				(w) => w.idEmployee === empOfProj?.id,
			);

			if (isEmpty(workOfEmp)) {
				return res.status(409).json("Bạn cần tham gia đầu việc này trước");
			}

			const employee =
				empOfProj?.proposeProject?.employeesOfDepartment?.employee;
			const department =
				empOfProj?.proposeProject?.employeesOfDepartment?.department;

			await tx.historyOfWork.create({
				data: {
					id: generateId("HIWO"),
					idEmployee: workOfEmp?.id,
					createdDate: new Date().toISOString(),
					content: JSON.stringify({
						...pick(updatedWork, ["finishDateET", "startDate"]),
						name: workOfProject?.work?.name,
						employeeEdit: employee?.fullName,
						department: department?.name,
					}),
					note: updatedWork.note,
				},
			});
			return res.json(updatedWork);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

// for task
export const createTask = async (req: ITaskOfWorkRequest, res: Response) => {
	const { idWork } = req.params;
	const { idEmployee, startDate, finishDateET, name, note } = req.body ?? {};
	if (!idWork || isEmpty(req.body))
		return res.status(409).json("invalid parameter");

	console.log(idEmployee);

	try {
		const empOfWork = await prismaClient.worksOfEmployee.findFirst({
			where: {
				idEmployee: idEmployee,
				idWorksProject: idWork,
			},
		});

		if (isEmpty(empOfWork)) {
			return res.status(409).json("Nhân viên chưa tham gia đầu việc");
		}

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
						id: empOfWork.id,
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
export const updatedTask = async (req: ITaskOfWorkRequest, res: Response) => {
	const { idTasksOfWork } = req.params;
	const { name, startDate, finishDateET, note } = req.body ?? {};
	try {
		if (!idTasksOfWork || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const existTaskOfWork = await prismaClient.tasksOfWork.findFirst({
			where: {
				id: idTasksOfWork,
				employee: {
					employee: {
						proposeProject: {
							employeesOfDepartment: {
								employee: {
									id: res.locals.idEmpLogin,
								},
							},
						},
					},
				},
			},
		});

		if (isEmpty(existTaskOfWork)) {
			return res.status(409).json("Nhân viên không có quyền sửa");
		}

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

		await prismaClient.$transaction(async (tx) => {
			const updatedTaskOfWork = await tx.tasksOfWork.update({
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
				include: {
					task: true,
				},
			});

			const empOfProj = res.locals.empOfProject;
			const employee =
				empOfProj?.proposeProject?.employeesOfDepartment?.employee;
			const department =
				empOfProj?.proposeProject?.employeesOfDepartment?.department;

			await tx.historyOfTask.create({
				data: {
					id: generateId("HITA"),
					idTask: updatedTaskOfWork.idTask,
					date: new Date().toISOString(),
					content: JSON.stringify({
						...pick(updatedTask, ["finishDateET", "startDate"]),
						name: updatedTaskOfWork?.task?.name,
						employeeEdit: employee?.fullName,
						department: department?.name,
					}),
					note: updatedTaskOfWork.note,
				},
			});

			return res.json(updatedTaskOfWork);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

// assign
export const assign = async (req: IWorkOfEmpRequest, res: Response) => {
	const { idWorksProject } = req.params;
	const { idEmployee } = req.body ?? {};
	try {
		if (!idWorksProject || isEmpty(req.body))
			return res.status(409).json("invalid parameters");

		const workOfProject = await prismaClient.worksOfEmployee.findFirst({
			where: {
				idWorksProject: idWorksProject,
				idEmployee,
			},
		});

		if (workOfProject) {
			return res.status(409).json("Nhân viên đã tồn tại trong đầu việc!");
		}

		const createdAssign = await prismaClient.worksOfEmployee.create({
			data: {
				id: generateId("WOEM"),
				idEmployee,
				idWorksProject,
			},
		});

		return res.json(createdAssign);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const history = async (req: IWorkProjectRequest, res: Response) => {
	const { page, limit } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;
	try {
		const { idWorkProject } = req.params;
		const totalItems = await prismaClient.historyOfWork.count({
			where: {
				employees: {
					worksOfProject: {
						id: idWorkProject,
					},
				},
			},
		});

		const historyOfWork = await prismaClient.historyOfWork.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				employees: {
					worksOfProject: {
						id: idWorkProject,
					},
				},
			},
		});

		return res.json({ historyOfWork, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const historyOfTask = async (req: ITaskOfWorkRequest, res: Response) => {
	try {
		const { page, limit } = req.query ?? {};
		const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
		const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;
		const { idTask } = req.params;
		console.log(idTask);
		const totalItems = await prismaClient.historyOfTask.count({
			where: {
				idTask,
			},
		});

		const historyOfTask = await prismaClient.historyOfTask.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				idTask,
			},
		});

		return res.json({ historyOfTask, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
