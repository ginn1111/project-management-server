import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { intersection, isEmpty, isNaN, isNil, isNull, omit } from "lodash";
import { IProjectRequest } from "../../@types/request";
import { Role } from "../../constants/general";
import { getDepartment } from "../../services/get-department";
import { getPositionOfEmp } from "../../services/get-position";
import { generateId } from "../../utils/generate-id";
import { StatePropose } from "../../constants/review";
import { WorkStateNames } from "../../migrations/work-state";

const prismaClient = new PrismaClient();

export const getList = async (req: IProjectRequest, res: Response) => {
	let {
		page,
		limit,
		search = "",
		startDate,
		finishDateET,
		idDepartment,
		idEmployee,
		isDone,
	} = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.project.count({
			where: {
				...(isNil(isDone)
					? undefined
					: {
							finishDate: isDone === "true" ? { not: null } : null,
					  }),
				...(idEmployee
					? {
							employees: {
								some: {
									proposeProject: {
										employeesOfDepartment: {
											idEmployee,
										},
									},
								},
							},
					  }
					: null),
				AND: [
					{
						name: {
							contains: search || undefined,
						},
					},
					{
						AND: [
							{
								startDate: {
									gte: startDate
										? new Date(startDate).toISOString()
										: undefined,
									lte: finishDateET
										? new Date(finishDateET).toISOString()
										: undefined,
								},
							},
							{
								finishDateET: {
									gte: startDate
										? new Date(startDate).toISOString()
										: undefined,
									lte: finishDateET
										? new Date(finishDateET).toISOString()
										: undefined,
								},
							},
							{
								departments: {
									...(idDepartment
										? {
												some: {
													AND: [
														{
															idDepartment: idDepartment || undefined,
														},
													],
												},
										  }
										: {}),
								},
							},
						],
					},
				],
			},
		});

		const projects = await prismaClient.project.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),

			include: {
				customers: { where: { endDate: null }, include: { customer: true } },
				departments: {
					include: {
						department: true,
					},
				},
				manageProjects: {
					where: {
						endDate: null,
						isHead: true,
					},
					include: {
						employee: true,
					},
				},
				worksOfProject: {
					include: {
						work: {
							include: {
								state: true,
							},
						},
					},
				},
			},
			where: {
				...(isNil(isDone)
					? undefined
					: {
							finishDate: isDone === "true" ? { not: null } : null,
					  }),
				...(idEmployee
					? {
							employees: {
								some: {
									proposeProject: {
										employeesOfDepartment: {
											idEmployee,
										},
									},
								},
							},
					  }
					: null),
				AND: [
					{
						name: {
							contains: search || undefined,
						},
					},
					{
						AND: [
							{
								startDate: {
									gte: startDate ? new Date(startDate) : undefined,
									lte: finishDateET ? new Date(finishDateET) : undefined,
								},
							},
							{
								finishDateET: {
									gte: startDate ? new Date(startDate) : undefined,
									lte: finishDateET ? new Date(finishDateET) : undefined,
								},
							},
							{
								departments: {
									...(idDepartment
										? {
												some: {
													AND: [
														{
															idDepartment: idDepartment || undefined,
														},
													],
												},
										  }
										: {}),
								},
							},
						],
					},
				],
			},
			orderBy: {
				createdDate: "desc",
			},
		});

		const fmtAlreadyDoneProjects = projects.map((p) => {
			const isAlreadyDone =
				p.worksOfProject?.length > 0 &&
				p.worksOfProject.every((wOPrj) => {
					return [WorkStateNames.Done, WorkStateNames.Canceled].includes(
						wOPrj.work?.state?.name ?? "",
					);
				});

			return {
				...omit(p, "worksOfProject"),
				isAlreadyDone: isAlreadyDone && !p.canceledDate && !p.finishDate,
			};
		});

		return res.json({ projects: fmtAlreadyDoneProjects, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const addNew = async (
	req: IProjectRequest<{
		departments: string[];
		idEmpHead: string;
		idCustomer?: string;
	}>,
	res: Response,
) => {
	const {
		name,
		startDate,
		idEmpHead,
		finishDateET,
		departments,
		note,
		idCustomer,
	} = req.body ?? {};

	try {
		if (!name || !startDate || !finishDateET) {
			return res.status(422).json("invalid parameters ");
		}

		const positionOfEmp = await getPositionOfEmp(res.locals.idEmpLogin);

		// logon employee is head of department
		if (positionOfEmp?.position?.code === Role.TRUONG_PHONG) {
			const departmentOfEmp = await getDepartment(res.locals.idEmpLogin);
			if (!departmentOfEmp?.idDepartment)
				return res.status(409).json("Không tồn tại phòng ban của trưởng phòng");
			await prismaClient.project.create({
				data: {
					id: generateId("PROJ"),
					name,
					isSingle: true,
					createdDate: new Date().toISOString(),
					startDate: startDate ? new Date(startDate).toISOString() : undefined,
					finishDateET: finishDateET
						? new Date(finishDateET).toISOString()
						: undefined,
					note,
					departments: {
						create: {
							id: generateId("DEPR"),
							idDepartment: departmentOfEmp.idDepartment,
							createdDate: new Date().toISOString(),
						},
					},
					manageProjects: {
						create: {
							id: generateId("MAPR"),
							startDate: new Date().toISOString(),
							idEmpHead: res.locals.idEmpLogin,
							isHead: true,
						},
					},
					...(idCustomer
						? {
								customers: {
									create: {
										id: generateId("CUPR"),
										createdDate: new Date().toISOString(),
										idCustomer,
									},
								},
						  }
						: null),
				},
			});
			return res.json("Tạo dự án đơn phòng ban thành công!");
		}

		if (
			positionOfEmp?.position?.code === Role.QUAN_LY_TRUONG_PHONG &&
			idEmpHead
		) {
			await prismaClient.$transaction(async (tx) => {
				// create new project
				const createdProj = await tx.project.create({
					data: {
						id: generateId("PROJ"),
						name,
						createdDate: new Date().toISOString(),
						startDate: startDate
							? new Date(startDate).toISOString()
							: undefined,
						finishDateET: finishDateET
							? new Date(finishDateET).toISOString()
							: undefined,
						note,

						...(idCustomer
							? {
									customers: {
										create: {
											id: generateId("CUPR"),
											createdDate: new Date().toISOString(),
											idCustomer,
										},
									},
							  }
							: null),
					},
				});

				if (departments?.length) {
					// create department of project
					await tx.departmentOfProject.createMany({
						data: departments.map((department) => ({
							id: generateId("DEPR"),
							idDepartment: department,
							idProject: createdProj.id,
							createdDate: new Date().toISOString(),
						})),
					});
				}

				// create creator of project
				await tx.manageProject.create({
					data: {
						id: generateId("MAPR"),
						startDate: new Date().toISOString(),
						idEmpHead: res.locals.idEmpLogin,
						idProject: createdProj.id,
					},
				});

				// create head of project
				await tx.manageProject.create({
					data: {
						id: generateId("MAPR"),
						startDate: new Date().toISOString(),
						idEmpHead,
						idProject: createdProj.id,
						isHead: true,
					},
				});
			});
			return res.json("Tạo dự án đa phòng ban thành công!");
		}

		return res.status(409).json("Có lỗi xảy ra, tạo dự án không thành công");
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
export const update = async (req: IProjectRequest, res: Response) => {
	const { id } = req.params;
	const {
		name,
		startDate,
		finishDateET,
		departments,
		note,
		idEmpHead,
		idCustomer,
	} = req.body ?? {};
	try {
		if (!id || !idEmpHead || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const existProject = await prismaClient.project.findFirst({
			where: {
				id,
			},
			include: {
				customers: { where: { endDate: null } },
				departments: true,
				manageProjects: {
					where: {
						endDate: null,
						isHead: true,
					},
				},
			},
		});

		if (isEmpty(existProject))
			return res.status(409).json("Dự án không tồn tại");

		const isHeadChange =
			existProject?.manageProjects?.length === 0 ||
			existProject?.manageProjects?.[0]?.idEmpHead !== idEmpHead;

		const isDeleteCustomer =
			!existProject?.customers?.[0]?.idCustomer ||
			existProject?.customers?.[0]?.idCustomer !== idCustomer;

		const _updatedProject = Object.assign(
			omit(existProject, "manageProjects"),
			{
				name,
				startDate: startDate ? new Date(startDate).toISOString() : undefined,
				finishDateET: finishDateET
					? new Date(finishDateET).toISOString()
					: undefined,
				note: note,
			},
		);

		// new department is the old in project
		const isExistDepartment =
			intersection(
				existProject.departments.map(({ idDepartment }) => idDepartment),
				departments,
			)?.length > 0;

		if (isExistDepartment)
			return res.status(409).json("Tồn tại phòng ban đã có trong dự án!");

		await prismaClient.$transaction(async (tx) => {
			const updatedProject = await tx.project.update({
				where: {
					id,
				},
				data: {
					...omit(_updatedProject, ["departments", "customers"]),
					...(departments?.length
						? {
								departments: {
									createMany: {
										data: departments?.map((idDepartment: string) => ({
											id: generateId("DEPR"),
											idDepartment: idDepartment,
											createdDate: new Date().toISOString(),
										})),
									},
								},
						  }
						: {
								// Donot allow remove when update
								// departments: {
								// 	deleteMany: existProject.departments.map(({ id }) => ({
								// 		id,
								// 	})),
								// },
						  }),
				},
			});

			if (isHeadChange) {
				if (existProject?.manageProjects?.[0]?.id) {
					await tx.manageProject.update({
						where: {
							id: existProject.manageProjects?.[0]?.id,
						},
						data: {
							endDate: new Date().toISOString(),
						},
					});
				}

				await tx.manageProject.create({
					data: {
						id: generateId("MAPR"),
						startDate: new Date().toISOString(),
						idEmpHead,
						idProject: id,
						isHead: true,
					},
				});
			}

			// handle customer change
			// handle case have old customer and do not have customer
			if (isDeleteCustomer) {
				const customerProject = await tx.customersOfProject.findFirst({
					where: {
						idCustomer: existProject.customers?.[0]?.idCustomer,
						idProject: id,
						endDate: null,
					},
				});

				// case do not have old idCustomer
				if (customerProject) {
					await tx.customersOfProject.update({
						where: {
							id: customerProject.id,
						},
						data: {
							endDate: new Date().toISOString(),
						},
					});
				}

				// case idCustomer is null -> cover it
				if (idCustomer) {
					await tx.customersOfProject.create({
						data: {
							id: generateId("CUPR"),
							createdDate: new Date().toISOString(),
							idCustomer,
							idProject: id,
						},
					});
				}
			}

			return res.json(updatedProject);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
export const detail = async (req: IProjectRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(422).json("invalid parameters");
		const project = await prismaClient.project.findFirst({
			where: {
				id,
			},
			include: {
				customers: { where: { endDate: null }, include: { customer: true } },
				departments: {
					include: {
						department: true,
					},
				},
				worksOfProject: {
					include: {
						work: {
							include: {
								state: true,
							},
						},
						worksOfEmployee: {
							include: {
								employee: true,
								tasksOfWork: {
									include: {
										task: {
											include: {
												history: true,
												resourceOfTasks: {
													include: {
														resource: true,
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
				projectResources: {
					include: {
						resource: true,
					},
				},
				proposeProject: {
					include: {
						reviewingProposeProject: {
							include: {
								proposeProject: true,
								statePropose: true,
							},
						},
					},
				},
				manageProjects: {
					where: {
						endDate: null,
						isHead: true,
					},
					include: {
						employee: true,
					},
				},
			},
		});

		return res.json(project);
	} catch (error) {
		console.log("error here");
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const getListByDepartment = async (
	req: IProjectRequest<{ idDepartment: string }>,
	res: Response,
) => {
	const { idDepartment } = req.params;

	try {
		const projectsOfDepartment = await prismaClient.project.findMany({
			where: {
				departments: {
					some: {
						idDepartment,
					},
				},
			},
		});

		return res.json(projectsOfDepartment);
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const addResource = async (
	req: IProjectRequest<{ resource: { id: string; amount: number }[] }>,
	res: Response,
) => {
	const { id } = req.params;
	const { resource } = req.body ?? {};

	let isMinus = false;
	try {
		if (!id || !resource?.length)
			return res.status(422).json("invalid parameter");

		const resourceIndex = resource.reduce(
			(acc, res) => {
				acc[res.id] = res.amount;
				return acc;
			},
			{} as Record<string, number>,
		);

		const resourceInProject = await Promise.all(
			resource.map(({ id: idResource }) =>
				prismaClient.projectResource.findFirst({
					where: { idResource, idProject: id },
				}),
			),
		);

		// will add amount to exist
		const existResourceInProject = resourceInProject.filter(Boolean);

		// will create a relation
		const nonExistResourceInProject = resourceInProject.reduce(
			(acc, rAndPr, idx) => {
				if (isNull(rAndPr)) {
					acc.push(resource[idx]);
				}
				return acc;
			},
			[] as { id: string; amount: number }[],
		);

		const resourceFind = await Promise.all(
			resource.map(({ id }) => {
				return prismaClient.resource.findFirst({ where: { id } });
			}),
		);

		await prismaClient.$transaction(
			async (tx) => {
				if (nonExistResourceInProject?.length) {
					await tx.projectResource.createMany({
						data: nonExistResourceInProject.map(
							({ id: idResource, amount }) => {
								return {
									id: generateId("REPR"),
									idProject: id,
									idResource,
									amount,
								};
							},
						),
					});
				}

				if (existResourceInProject?.length) {
					await Promise.all(
						existResourceInProject.map((r) => {
							return tx.projectResource.update({
								where: {
									id: r!.id,
								},
								data: {
									amount: r!.amount + resourceIndex[r!.idResource!],
								},
							});
						}),
					);
				}

				const removedResource = await Promise.all(
					resourceFind.map((r) => {
						return tx.resource.update({
							where: {
								id: r!.id,
							},
							data: {
								amount: r!.amount - resourceIndex[r!.id],
							},
						});
					}),
				);

				isMinus = removedResource.some((item) => item.amount < 0);
				if (isMinus) throw Error();
			},
			{
				timeout: 20000,
			},
		);
		return res.json("Thêm nguồn lực thành công");
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(isMinus ? "Không đủ nguồn lực để thêm!" : "Server error");
	}
};

export const done = async (req: IProjectRequest, res: Response) => {
	const { id } = req.params;
	try {
		const project = await prismaClient.project.findFirst({
			where: {
				id,
			},
			include: {
				worksOfProject: {
					include: {
						work: {
							include: {
								state: true,
							},
						},
					},
				},
			},
		});

		if (!project?.worksOfProject.length) {
			return res.status(409).json("Dự án chưa có đầu việc nào");
		}

		const allCancelWork = project?.worksOfProject.every(
			(workOfPrj) => workOfPrj.work?.state?.name === WorkStateNames.Canceled,
		);

		if (allCancelWork) {
			return res
				.status(409)
				.json("Tất cả đầu việc của dự án đã bị huỷ, không thể hoàn thành!");
		}

		const allWorkDone = project?.worksOfProject.every(
			(workOfPrj) =>
				workOfPrj.finishDate ||
				workOfPrj.work?.state?.name === WorkStateNames.Canceled,
		);

		if (!allWorkDone) {
			return res.status(409).json("Các đầu việc của dự án chưa hoàn thành!");
		}

		if (project?.finishDate) {
			return res.status(409).json("Dự án đã hoàn thành");
		}

		const doneProject = await prismaClient.project.update({
			where: {
				id,
			},
			data: {
				finishDate: new Date().toISOString(),
			},
		});

		return res.json(doneProject);
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const addEmployees = async (
	req: IProjectRequest<{ employees: string[] }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const { employees } = req.body ?? {};
		if (!id || !employees?.length)
			return res.status(422).json("Invalid parameter");

		// employeesOfDepartment list with employees
		const deEmpList = await Promise.all(
			employees.map((idEmployee) =>
				prismaClient.employeesOfDepartment.findFirst({
					where: {
						endDate: null,
						idEmployee,
					},
				}),
			),
		);

		const approvedStatePropose = await prismaClient.statePropose.findFirst({
			where: {
				name: StatePropose.Approve,
			},
		});

		if (!approvedStatePropose) {
			return res.status(409).json("Trạng thái duyệt không hợp lệ!");
		}

		// find propose with state pending after that approve these
		await Promise.all(
			deEmpList.filter(Boolean).map(async (deEmp) => {
				const pendingPropose = await prismaClient.proposeProject.findFirst({
					where: {
						idProject: id,
						idDeEmp: deEmp?.id,
						reviewingProposeProject: {
							some: {
								statePropose: {
									name: StatePropose.Pending,
								},
							},
						},
					},
					include: {
						reviewingProposeProject: true,
					},
				});

				if (pendingPropose) {
					prismaClient.$transaction(async (tx) => {
						// update pending propose to approve
						await tx.reviewingProposeProject.update({
							where: {
								id: pendingPropose.reviewingProposeProject[0].id,
							},
							data: {
								idProposeProject: pendingPropose.id,
								note: "Trưởng phòng điều phối nhân viên vào dự án",
								reviewingDate: new Date().toISOString(),
								idState: approvedStatePropose.id,
							},
						});

						// create new employee in project
						await tx.employeesOfProject.create({
							data: {
								id: generateId("EMPR"),
								idProject: id,
								idProposeProject: pendingPropose.id,
								startDate: new Date().toISOString(),
							},
						});
					});
				} else {
					// create propose, review and employeesOfProject
					await prismaClient.proposeProject.create({
						data: {
							id: generateId("PRPR"),
							createdDate: new Date().toISOString(),
							content: "Trưởng phòng điều phối nhân viên vào dự án",
							idDeEmp: deEmp?.id!,
							idProject: id,
							reviewingProposeProject: {
								create: {
									id: generateId("REVW"),
									idState: approvedStatePropose.id,
									reviewingDate: new Date().toISOString(),
								},
							},
							employeesOfProject: {
								create: {
									id: generateId("EMPR"),
									idProject: id,
									startDate: new Date().toISOString(),
								},
							},
						},
					});
				}
			}),
		);

		return res.json("Thêm nhân viên vào dự án thành công");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const cancel = async (req: IProjectRequest, res: Response) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(409).json("invalid parameter");
		}

		const projectInfo = await prismaClient.project.findFirst({
			where: {
				id,
			},
		});

		if (!projectInfo) {
			return res.status(422).json("Dự án không tồn tại");
		}

		if (projectInfo.canceledDate) {
			return res.status(422).json("Dự án đã bị huỷ");
		}

		// find processing or done works of project
		const processOrDoneWorksOfProj = await prismaClient.worksOfProject.findMany(
			{
				where: {
					idProject: id,
					work: {
						state: {
							AND: [
								{
									name: {
										not: WorkStateNames.Planing,
									},
								},
								{
									name: {
										not: WorkStateNames.Canceled,
									},
								},
							],
						},
					},
				},
			},
		);

		if (processOrDoneWorksOfProj?.length) {
			return res.status(422).json("Dự án đã bắt đầu, không thể huỷ");
		}

		const planingWorksOfProject = await prismaClient.worksOfProject.findMany({
			where: {
				idProject: id,
				work: {
					state: {
						name: WorkStateNames.Planing,
					},
				},
			},
			include: {
				work: true,
			},
		});

		const canceledState = await prismaClient.workState.findFirst({
			where: {
				name: WorkStateNames.Canceled,
			},
		});

		if (!canceledState) {
			return res
				.status(422)
				.json("Có lỗi xảy ra, không tìm thấy trạng thái huỷ");
		}

		await prismaClient.$transaction(async (tx) => {
			// cancel all planing works
			if (planingWorksOfProject?.length) {
				await Promise.all(
					planingWorksOfProject.map((wOfP) =>
						prismaClient.work.update({
							where: {
								id: wOfP.idWork as string,
							},
							data: {
								idState: canceledState.id,
							},
						}),
					),
				);
			}

			await prismaClient.project.update({
				where: {
					id,
				},
				data: {
					canceledDate: new Date().toISOString(),
				},
			});

			return res.json("Huỷ dự án thành công");
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
