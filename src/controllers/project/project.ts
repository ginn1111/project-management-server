import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { intersection, isEmpty, isNaN, isNull, omit } from "lodash";
import { IProjectRequest } from "../../@types/request";
import { generateId } from "../../utils/generate-id";
import { getDepartment } from "../../services/get-department";
import { StatePropose } from "../../constants/review";

const prismaClient = new PrismaClient();

export const getList = async (req: IProjectRequest, res: Response) => {
	let {
		page,
		limit,
		search = "",
		startDate,
		finishDateET,
		idDepartment,
	} = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.project.count({
			where: {
				AND: [
					{
						name: {
							contains: search || undefined,
						},
					},
					{
						OR: [
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
		});

		const projects = await prismaClient.project.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			include: {
				departments: {
					include: {
						department: true,
					},
				},
				customers: true,
				manageProjects: {
					where: {
						endDate: null,
						isHead: true,
					},
				},
			},
			where: {
				AND: [
					{
						name: {
							contains: search || undefined,
						},
					},
					{
						OR: [
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

		return res.json({ projects, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const addNew = async (
	req: IProjectRequest<{ departments: string[]; idEmpHead: string }>,
	res: Response,
) => {
	const { name, startDate, idEmpHead, finishDateET, departments, note } =
		req.body ?? {};

	try {
		if (!name || !idEmpHead || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters ");
		}

		await prismaClient.$transaction(async (tx) => {
			// create new project
			const createdProj = await tx.project.create({
				data: {
					id: generateId("PROJ"),
					name,
					createdDate: new Date().toISOString(),
					startDate: startDate ? new Date(startDate).toISOString() : undefined,
					finishDateET: finishDateET
						? new Date(finishDateET).toISOString()
						: undefined,
					note,
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

			await tx.manageProject.create({
				data: {
					id: generateId("MAPR"),
					startDate: new Date().toISOString(),
					idEmpHead,
					idProject: createdProj.id,
					isHead: true,
				},
			});
			// create head of project
		});

		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
export const update = async (req: IProjectRequest, res: Response) => {
	const { id } = req.params;
	const { name, startDate, finishDateET, departments, note, idEmpHead } =
		req.body ?? {};
	try {
		if (!id || !idEmpHead || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const existProject = await prismaClient.project.findFirst({
			where: {
				id,
			},
			include: {
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
			existProject?.manageProjects?.[0]?.idEmpHead !== idEmpHead;

		const _updatedProject = Object.assign(
			omit(existProject, "manageProjects"),
			{
				name,
				startDate: startDate ? new Date(startDate).toISOString() : undefined,
				finishDateET: finishDateET
					? new Date(finishDateET).toISOString()
					: undefined,
				note,
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
					...omit(_updatedProject, "departments"),
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

			if (isHeadChange && existProject?.manageProjects?.[0]?.id) {
				await tx.manageProject.update({
					where: {
						id: existProject.manageProjects?.[0]?.id,
					},
					data: {
						endDate: new Date().toISOString(),
					},
				});
				await tx.manageProject.create({
					data: {
						id: generateId("MAPR"),
						startDate: new Date().toISOString(),
						idEmpHead,
						idProject: id,
					},
				});
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
				worksOfProject: {
					include: {
						work: true,
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

				await Promise.all(
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
			},
			{
				timeout: 20000,
			},
		);
		return res.json("Thêm nguồn lực thành công");
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
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
				worksOfProject: true,
			},
		});

		if (!project?.worksOfProject?.length) {
			return res.status(409).json("Dự án chưa có đầu việc nào");
		}

		const allWorkDone = project?.worksOfProject.every(
			(workOfPrj) => !!workOfPrj.finishDate,
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
