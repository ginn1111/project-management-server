import { PrismaClient } from "@prisma/client";
import { IStatisticRequest } from "../../@types/request";
import { Response } from "express";
import dayjs from "dayjs";
import { isUndefined } from "lodash";

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
