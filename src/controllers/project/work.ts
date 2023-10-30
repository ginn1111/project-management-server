import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import { IWorkProjectRequest } from "../../@types/request";
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
