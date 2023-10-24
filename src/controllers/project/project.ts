import { Response } from "express";
import { IProjectRequest } from "../../@types/request";
import { PrismaClient } from "@prisma/client";
import { intersection, isEmpty, isNaN, omit } from "lodash";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

export const getList = async (req: IProjectRequest, res: Response) => {
	let { page, limit, search = "", dateStart, dateEnd } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.project.count({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				OR: [
					{
						name: {
							contains: search,
						},
					},
					{
						startDate: {
							lte: dateStart ? new Date(dateStart) : undefined,
							gte: dateEnd ? new Date(dateEnd) : undefined,
						},
					},
					{
						finishDate: {
							lte: dateStart ? new Date(dateStart) : undefined,
							gte: dateEnd ? new Date(dateEnd) : undefined,
						},
					},
				],
			},
		});

		const projects = await prismaClient.project.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			include: {
				departments: true,
				customers: true,
			},
			where: {
				OR: [
					{
						name: {
							contains: search,
						},
					},
					{
						startDate: {
							lte: dateStart ? new Date(dateStart) : undefined,
							gte: dateEnd ? new Date(dateEnd) : undefined,
						},
					},
					{
						finishDate: {
							lte: dateStart ? new Date(dateStart) : undefined,
							gte: dateEnd ? new Date(dateEnd) : undefined,
						},
					},
				],
			},
			orderBy: {
				startDate: "desc",
			},
		});

		return res.json({ projects, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Lỗi hệ thống, vui lòng liên hệ quản lý!");
	}
};
export const addNew = async (
	req: IProjectRequest<{ departments: string[] }>,
	res: Response,
) => {
	const { name, startDate, finishDateET, departments, note } = req.body ?? {};

	try {
		if (!name || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters ");
		}

		await prismaClient.$transaction(async (tx) => {
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
				await tx.departmentOfProject.createMany({
					data: departments.map((department) => ({
						id: generateId("DEPR"),
						idDepartment: department,
						idProject: createdProj.id,
						createdDate: new Date().toISOString(),
					})),
				});
			}
		});

		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
export const update = async (req: IProjectRequest, res: Response) => {
	const { id } = req.params;
	const { name, startDate, finishDateET, departments, note } = req.body ?? {};
	try {
		if (!id || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const existProject = await prismaClient.project.findFirst({
			where: {
				id,
			},
			include: {
				departments: true,
			},
		});

		if (isEmpty(existProject))
			return res.status(409).json("Dự án không tồn tại");

		const _updatedProject = Object.assign(existProject, {
			name,
			startDate: startDate ? new Date(startDate).toISOString() : undefined,
			finishDateET: finishDateET
				? new Date(finishDateET).toISOString()
				: undefined,
			note,
		});

		// new department is the old in project
		const isExistDepartment =
			intersection(
				existProject.departments.map(({ idDepartment }) => idDepartment),
				departments,
			)?.length > 0;

		if (isExistDepartment)
			return res.status(409).json("Tồn tại phòng ban đã có trong dự án!");

		const updatedProject = await prismaClient.project.update({
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
					: undefined),
			},
		});

		return res.json(updatedProject);
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
export const detail = async (req: IProjectRequest, res: Response) => {};
