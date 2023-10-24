import { Response } from "express";
import { IResourceRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getList = async (req: IResourceRequest, res: Response) => {
	const { page, limit, search = "" } = req.query ?? {};
	const { idResourceType } = req.body ?? {};
	const _page = !isNaN(page as any) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.resource.count({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				name: {
					contains: search,
				},
				idResourceType,
			},
		});

		const resource = await prismaClient.resource.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				name: {
					contains: search,
				},
				idResourceType,
			},
		});
		return res.json({ resource, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
