import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { Response } from "express";
import { groupBy, isEmpty, isUndefined, pick } from "lodash";
import { IStatisticRequest } from "../../@types/request";
const prismaClient = new PrismaClient();

export const statisticProject = async (
	req: IStatisticRequest,
	res: Response,
) => {
	try {
		const { isExpired, startDate, finishDate } = req.query ?? {};
		const projects = await prismaClient.project.findMany({
			where: {
				...(startDate && finishDate
					? {
							startDate: {
								gte: startDate ? new Date(startDate).toISOString() : undefined,
								lte: finishDate
									? new Date(finishDate).toISOString()
									: undefined,
							},
							OR: [
								{
									finishDate: {
										gte: startDate
											? new Date(startDate).toISOString()
											: undefined,
										lte: finishDate
											? new Date(finishDate).toISOString()
											: undefined,
									},
								},
								{
									finishDateET: {
										gte: startDate
											? new Date(startDate).toISOString()
											: undefined,
										lte: finishDate
											? new Date(finishDate).toISOString()
											: undefined,
									},
								},
							],
					  }
					: null),
			},
			include: {
				projectResources: {
					include: {
						resource: true,
					},
				},
				worksOfProject: {
					include: {
						worksOfEmployee: {
							include: {
								tasksOfWork: true,
							},
						},
					},
				},
				manageProjects: {
					where: { isHead: true, endDate: null },
					include: {
						employee: true,
					},
				},
			},
		});

		if (isUndefined(isExpired)) return res.json({ projects });
		if (isExpired === "true") {
			return res.json({
				projects: projects.filter((p) => {
					return (
						dayjs(p.finishDate).get("seconds") <=
						dayjs(p.finishDateET).get("seconds")
					);
				}),
			});
		} else {
			return res.json({
				projects: projects.filter((p) => {
					return (
						dayjs(p.finishDate).get("seconds") >
						dayjs(p.finishDateET).get("seconds")
					);
				}),
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const statisticWork = async (req: IStatisticRequest, res: Response) => {
	const { id: idProject } = req.params;
	const { startDate, finishDate, idEmployee, idEmpProject } = req.query ?? {};
	try {
		const workOfEmployee = await prismaClient.worksOfEmployee.findMany({
			where: {
				...(idEmpProject
					? {
							idEmployee: idEmpProject,
					  }
					: null),
				...(idEmployee
					? {
							employee: {
								proposeProject: {
									employeesOfDepartment: {
										idEmployee,
									},
								},
							},
					  }
					: null),
				worksOfProject: {
					idProject,
					...(startDate && finishDate
						? {
								startDate: {
									gte: startDate
										? new Date(startDate).toISOString()
										: undefined,
									lte: finishDate
										? new Date(finishDate).toISOString()
										: undefined,
								},
								OR: [
									{
										finishDate: {
											gte: startDate
												? new Date(startDate).toISOString()
												: undefined,
											lte: finishDate
												? new Date(finishDate).toISOString()
												: undefined,
										},
									},
									{
										finishDateET: {
											gte: startDate
												? new Date(startDate).toISOString()
												: undefined,
											lte: finishDate
												? new Date(finishDate).toISOString()
												: undefined,
										},
									},
								],
						  }
						: null),
				},
			},
			include: {
				tasksOfWork: {
					include: {
						task: true,
					},
				},
				worksOfProject: {
					include: {
						workEvaluation: {
							include: {
								rankWorkEvaluation: true,
							},
						},
						work: true,
					},
				},
			},
		});

		return res.json({ workOfEmployee });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const statisticProjectOfEmployee = async (
	req: IStatisticRequest,
	res: Response,
) => {
	try {
		const { idDepartment, startDate, finishDate } = req.query ?? {};

		if (!idDepartment) return res.status(422).json("invalid parameter");
		const empOfProjectPromise = prismaClient.employeesOfProject.findMany({
			where: {
				endDate: null,
				project: {
					finishDate: null,
					...(startDate && finishDate
						? {
								startDate: {
									lte: finishDate && new Date(finishDate).toISOString(),
								},
								finishDateET: {
									gte: startDate && new Date(startDate).toISOString(),
								},
						  }
						: null),
				},
				proposeProject: {
					employeesOfDepartment: {
						idDepartment,
						employee: {
							isActive: true,
						},
					},
				},
			},
			include: {
				project: true,
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
		});

		const empOfDepartmentPromise = prismaClient.employeesOfDepartment.findMany({
			where: {
				endDate: null,
				idDepartment,
				employee: {
					isActive: true,
				},
			},
			include: {
				employee: true,
			},
		});

		const [empOfProject, empOfDepartment] = await Promise.all([
			empOfProjectPromise,
			empOfDepartmentPromise,
		]);

		const projectGroupByEmp = groupBy(
			empOfProject,
			"proposeProject.employeesOfDepartment.idEmployee",
		);

		const _projectsOfEmp = empOfDepartment.map((empOfDepart) => ({
			projects: (
				projectGroupByEmp[
					empOfDepart.idEmployee as keyof typeof projectGroupByEmp
				] ?? []
			).map((value) => pick(value, "project")),
			employee: empOfDepart.employee,
		}));

		const projectsOfEmp = await Promise.all(
			_projectsOfEmp.map(async ({ projects, employee }) => {
				const _projects = await prismaClient.manageProject.findMany({
					where: {
						project: {
							finishDate: null,
							...(startDate && finishDate
								? {
										startDate: {
											lte: finishDate && new Date(finishDate).toISOString(),
										},
										finishDateET: {
											gte: startDate && new Date(startDate).toISOString(),
										},
								  }
								: null),
						},
						endDate: null,
						idEmpHead: employee?.id,
					},
					include: {
						project: true,
					},
				});

				const newProjects = [
					...projects,
					...(_projects
						?.map((manageProject) => ({ project: manageProject.project }))
						?.filter(({ project }) => !isEmpty(project)) ?? []),
				];

				return {
					projects: newProjects,
					employee,
				};
			}),
		);

		return res.json({
			projectsOfEmp,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
