import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { IManageProjectRequest } from "../../@types/request";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

export const getPermissionOfProject = async (
	req: IManageProjectRequest,
	res: Response,
) => {
	const { idProject } = req.params;

	try {
		if (!idProject) return res.status(422).json("invalid parameter");

		const manageProject = await prismaClient.manageProject.findMany({
			where: {
				idProject,
				endDate: null,
				isHead: false,
			},
			include: {
				employee: true,
			},
		});

		return res.json({ manageProject });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const addManageProject = async (
	req: IManageProjectRequest<{
		manageProject: { id: string; isAdd: boolean }[];
	}>,
	res: Response,
) => {
	const { idProject } = req.params;
	const { manageProject } = req.body ?? {};

	if (!idProject || !manageProject?.length)
		return res.json(422).json("invalid parameter");
	const manageProjectAdd = manageProject.filter((manage) => manage.isAdd);
	const manageProjectRemove = manageProject.filter((manage) => !manage.isAdd);

	await prismaClient.$transaction(async (tx) => {
		await tx.manageProject.createMany({
			data: manageProjectAdd.map(({ id }) => ({
				id: generateId("MAPR"),
				idEmpHead: id,
				idProject,
				startDate: new Date().toISOString(),
			})),
		});

		await tx.manageProject.updateMany({
			where: {
				endDate: null,
				idEmpHead: {
					in: manageProjectRemove.map(({ id }) => id),
				},
				idProject,
			},
			data: {
				endDate: new Date().toISOString(),
			},
		});

		return res.json("Phân quyền thành công");
	});

	try {
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
