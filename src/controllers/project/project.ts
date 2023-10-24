import { Response } from "express";
import { IProjectRequest } from "../../@types/request";
import { PrismaClient } from "@prisma/client";
import { isNaN } from "lodash";

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
		});

		return res.json({ projects, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Lỗi hệ thống, vui lòng liên hệ quản lý!");
	}
};
export const update = async (req: IProjectRequest, res: Response) => {};
export const detail = async (req: IProjectRequest, res: Response) => {};
