import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty, isNull, omit, pick } from "lodash";
import {
	IPermissionOfWorkRequest,
	IResourceOfTaskRequest,
	ITaskOfWorkRequest,
	IWorkOfEmpRequest,
	IWorkProjectRequest,
} from "../../@types/request";
import { PERMISSION } from "../../constants/general";
import { getEmpOfProject } from "../../services/get-emp-of-project";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

export const getList = async (req: IWorkProjectRequest, res: Response) => {
	const { id } = req.params;

	try {
		if (res.locals.headOrCreator) {
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
											resourceOfTasks: {
												include: {
													resource: {
														include: {
															resource: true,
														},
													},
												},
											},
										},
									},
								},
								orderBy: {
									startDate: "asc",
								},
							},
						},
					},
					work: true,
				},
				orderBy: {
					startDate: "asc",
				},
			});

			return res.json(worksOfProject);
		} else {
			// work with been assigned or authorization
			const empOfProject = res.locals.empOfProject;
			const workOfProject = await prismaClient.worksOfProject.findMany({
				where: {
					idProject: id,
					OR: [
						{
							permissionWorkOfEmployee: {
								some: {
									permissionWork: {
										code: PERMISSION.XEM,
									},
								},
							},
						},
						{
							worksOfEmployee: {
								some: {
									idEmployee: empOfProject.id,
								},
							},
						},
					],
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
											resourceOfTasks: {
												include: {
													resource: {
														include: {
															resource: true,
														},
													},
												},
											},
										},
									},
								},
								orderBy: {
									startDate: "asc",
								},
							},
						},
					},
					work: true,
				},
				orderBy: {
					startDate: "asc",
				},
			});
			return res.json(workOfProject);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const add = async (req: IWorkProjectRequest, res: Response) => {
	const { id } = req.params;
	const { name, startDate, finishDateET, note } = req.body ?? {};
	try {
		if (!id || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const empOfProject = await getEmpOfProject(id, res.locals.idEmpLogin);

		await prismaClient.$transaction(async (tx) => {
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
					worksOfEmployee: {
						create: {
							id: generateId("WOEM"),
							idEmployee: empOfProject?.id,
						},
					},
				},
			});

			return res.json(createdWork);
		});
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

			// get from middleware in-project
			const empOfProj = res.locals.empOfProject;

			const workOfEmp = updatedWork.worksOfEmployee.find(
				(w) => w.idEmployee === empOfProj?.id,
			);

			const isHeadOrCreator = res.locals.headOrCreator;

			if (isEmpty(workOfEmp) && !isHeadOrCreator) {
				return res.status(409).json("Bạn cần tham gia đầu việc này trước");
			}

			const employee =
				empOfProj?.proposeProject?.employeesOfDepartment?.employee;
			const department =
				empOfProj?.proposeProject?.employeesOfDepartment?.department;

			const headOrCreator = res.locals.headOrCreator;

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

			await tx.historyOfWork.create({
				data: {
					id: generateId("HIWO"),
					idWork: updatedWork.idWork,
					createdDate: new Date().toISOString(),
					content: JSON.stringify({
						...pick(updatedWork, ["finishDateET", "startDate"]),
						name: name ?? workOfProject?.work?.name,
						employeeEdit:
							employee?.fullName ?? headOrCreator?.employee?.fullName,
						department:
							department?.name ??
							(headOrCreator?.isHead ? "Phụ trách dự án" : "Người tạo dự án"),
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

export const done = async (req: ITaskOfWorkRequest, res: Response) => {
	const { idWorkProject } = req.params;
	try {
		const worksOfProject = await prismaClient.worksOfProject.findFirst({
			where: {
				id: idWorkProject,
			},
			include: {
				worksOfEmployee: {
					include: {
						tasksOfWork: true,
					},
				},
			},
		});

		const flatTasksOfWork = worksOfProject?.worksOfEmployee.flatMap(
			(w) => w.tasksOfWork,
		);
		const isAllTaskDone =
			flatTasksOfWork?.length === 0 ||
			flatTasksOfWork?.some((task) => task.finishDate);

		if (!isAllTaskDone) {
			return res.status(409).json("Các công việc chưa hoàn thành!");
		}

		const workOfProject = await prismaClient.worksOfProject.findFirst({
			where: {
				id: idWorkProject,
			},
		});

		if (workOfProject?.finishDate) {
			return res.status(309).json("Đầu việc này đã hoàn thành");
		}

		await prismaClient.worksOfProject.update({
			where: {
				id: idWorkProject,
			},
			data: {
				finishDate: new Date().toISOString(),
			},
		});

		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

/**
 * 															FOR TASK
 * */
export const createTask = async (req: ITaskOfWorkRequest, res: Response) => {
	const { idWork } = req.params;
	const { idEmployee, startDate, finishDateET, name, note } = req.body ?? {};
	if (!idWork || isEmpty(req.body))
		return res.status(409).json("invalid parameter");

	try {
		if (!idEmployee && !res.locals.headOrCreator) {
			return res.status(409).json("Bạn không có quyền để tạo công việc");
		}

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

		const _updatedTaskOfWork = Object.assign(
			{},
			omit(existTaskOfWork, ["idTask", "idEmployee", "employee"]),
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

			const headOrCreator = res.locals.headOrCreator;

			await tx.historyOfTask.create({
				data: {
					id: generateId("HITA"),
					idTask: updatedTaskOfWork.idTask,
					date: new Date().toISOString(),
					content: JSON.stringify({
						...pick(updatedTaskOfWork, ["finishDateET", "startDate"]),
						name: updatedTaskOfWork?.task?.name,
						employeeEdit:
							employee?.fullName ?? headOrCreator?.employee?.fullName,
						department:
							department?.name ??
							(headOrCreator?.isHead
								? "Người phụ trách dự án"
								: "Người tạo dự án"),
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
		const { idWork } = req.params;
		const totalItems = await prismaClient.historyOfWork.count({
			where: {
				idWork,
			},
		});

		const historyOfWork = await prismaClient.historyOfWork.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				idWork,
			},
			orderBy: {
				createdDate: "desc",
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
			orderBy: {
				date: "desc",
			},
		});

		return res.json({ historyOfTask, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const doneTask = async (req: ITaskOfWorkRequest, res: Response) => {
	const { idTaskOfWork } = req.params;
	const { percentOfDone } = req.body ?? {};
	try {
		if (!idTaskOfWork || !percentOfDone)
			return res.status(422).json("invalid parameter");

		const taskOfWork = await prismaClient.tasksOfWork.findFirst({
			where: { id: idTaskOfWork },
		});

		if (taskOfWork?.finishDate) {
			return res.status(309).json("Công việc đã hoàn thành");
		}

		await prismaClient.tasksOfWork.update({
			where: {
				id: idTaskOfWork,
			},
			data: {
				finishDate: new Date().toISOString(),
				percentOfDone,
			},
		});

		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const addResourceForTask = async (
	req: IResourceOfTaskRequest<{ resource: { id: string; amount: number }[] }>,
	res: Response,
) => {
	const { idTask } = req.params;
	const { resource } = req.body ?? {};
	try {
		if (!idTask || !resource?.length)
			return res.status(422).json("invalid parameters");

		// create index for update exist and subtract
		const resourceIndex = resource.reduce(
			(acc, { id, amount }) => {
				acc[id] = amount;
				return acc;
			},
			{} as Record<string, number>,
		);

		// get resource of this task for update amount
		const resourceOfTask = await Promise.all(
			resource.map(({ id }) =>
				prismaClient.resourceOfTask.findFirst({
					where: { idResource: id, idTask },
				}),
			),
		);

		// exist will update
		const existResourceInTask = resourceOfTask.filter(Boolean);

		// non-exist will create
		const nonExistResourceInTask = resourceOfTask.reduce(
			(acc, resourceInTask, idx) => {
				if (isNull(resourceInTask)) {
					acc.push(resource[idx]);
				}

				return acc;
			},
			[] as { id: string; amount: number }[],
		);

		// exist resource of project - subtract amount
		const resourcesOfProject = await prismaClient.projectResource.findMany({
			where: {
				id: {
					in: resource.map(({ id }) => id),
				},
			},
		});

		await prismaClient.$transaction(async (tx) => {
			if (nonExistResourceInTask?.length) {
				await tx.resourceOfTask.createMany({
					data: nonExistResourceInTask.map(({ id, amount }) => ({
						id: generateId("RETA"),
						idTask,
						idResource: id,
						amount,
					})),
				});
			}
			if (existResourceInTask?.length) {
				await Promise.all(
					existResourceInTask.map((r) =>
						prismaClient.resourceOfTask.update({
							where: {
								id: r!.id,
							},
							data: {
								amount: r!.amount + resourceIndex[r!.idResource!],
							},
						}),
					),
				);
			}

			await Promise.all(
				resourcesOfProject.map(({ id, amount }) => {
					console.log(amount, resourceIndex[id]);
					return tx.projectResource.update({
						where: {
							id,
						},
						data: {
							amount: amount - resourceIndex[id!],
						},
					});
				}),
			);
		});

		return res.json("Thêm nguồn lực thành công");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const assignPermission = async (
	req: IPermissionOfWorkRequest<{
		permissions: { id: string; isGrant: boolean }[];
	}>,
	res: Response,
) => {
	const { idWorkProject } = req.params;
	const { permissions, idEmpProject } = req.body ?? {};
	try {
		if (!idWorkProject || !permissions?.length || !idEmpProject)
			return res.status(422).json("invalid parameter");

		// check if work been assign
		const workOfEmp = await prismaClient.worksOfEmployee.findFirst({
			where: {
				idWorksProject: idWorkProject,
				idEmployee: idEmpProject,
			},
		});

		if (!isEmpty(workOfEmp)) {
			return res
				.status(409)
				.json("Nhân viên này đã được giao việc, không thể phân quyền!");
		}

		// check if emp have this permission
		const existPermissions = await Promise.all(
			permissions.map(({ id }) =>
				prismaClient.permissionWorksOfEmployee.findFirst({
					where: {
						idPermission: id,
						idEmpProject,
					},
				}),
			),
		);

		// for delete
		const noneIsGrantPermission = permissions.filter(({ isGrant }) => !isGrant);

		// for add new
		const noneExistIsGrantPermission = permissions.filter(
			({ id, isGrant }) =>
				!existPermissions.find(
					(permission) => permission?.idPermission === id && isGrant,
				),
		);

		if (!noneExistIsGrantPermission?.length) {
			return res.status(409).json("Không có thay đổi nào!");
		}

		await prismaClient.$transaction(async (tx) => {
			await tx.permissionWorksOfEmployee.createMany({
				data: permissions.map(({ id }) => ({
					id: generateId("PEWO"),
					idEmpProject,
					idPermission: id,
					idWorkProject,
				})),
			});

			await tx.permissionWorksOfEmployee.deleteMany({
				where: {
					idPermission: {
						in: noneIsGrantPermission.map(({ id }) => id),
					},
				},
			});
			return res.json("Thêm quyền cho nhân viên thành công");
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const getWorkPermissions = async (
	req: IWorkProjectRequest,
	res: Response,
) => {
	try {
		const { idWorkProject, idEmpProject } = req.params;
		if (!idWorkProject || !idEmpProject)
			return res.status(409).json("invalid parameter");

		const permissionOfWork =
			await prismaClient.permissionWorksOfEmployee.findMany({
				where: {
					idEmpProject,
					workOfProject: {
						id: idWorkProject,
					},
				},
			});

		return res.json({ permissions: permissionOfWork });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
