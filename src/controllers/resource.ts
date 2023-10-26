import { Response } from "express";
import { IResourceRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";
import { generateId } from "../utils/generate-id";
import { isEmpty } from "lodash";

const prismaClient = new PrismaClient();

export const getList = async (req: IResourceRequest, res: Response) => {
	const { page, limit, search = "", idResourceType } = req.query ?? {};
	const _page = !isNaN(page as any) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.resource.count({
			where: {
				name: {
					contains: search || undefined,
				},
				idResourceType: idResourceType || undefined,
			},
		});

		const resource = await prismaClient.resource.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				name: {
					contains: search || undefined,
				},
				idResourceType: idResourceType || undefined,
			},
			include: {
				resourceType: true,
			},
		});
		return res.json({ resource, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const addNew = async (req: IResourceRequest, res: Response) => {
	const { idResourceType, name, amount = 0, note } = req.body ?? {};

	try {
		if (!idResourceType || !name)
			return res.status(422).json("invalid parameters");
		const createdResource = await prismaClient.resource.create({
			data: {
				id: generateId("RESO"),
				idResourceType,
				name,
				amount,
				note,
			},
		});

		return res.json(createdResource);
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const update = async (req: IResourceRequest, res: Response) => {
	const { id } = req.params;
	const { name, amount, note, idResourceType } = req.body ?? {};
	try {
		if (isEmpty(req.body)) return res.status(422).json("invalid parameters");
		if (amount && amount < 0) {
			return res.status(422).json("Số lượng không được là số âm");
		}

		const resource = await prismaClient.resource.findFirst({
			where: {
				id,
			},
		});

		if (isEmpty(resource))
			return res.status(422).json("Nguồn lực không tồn tại");

		const _updatedResource = Object.assign(resource, {
			name,
			amount,
			note,
			idResourceType,
		});

		const updatedResource = await prismaClient.resource.update({
			where: {
				id,
			},
			data: _updatedResource,
		});

		return res.json(updatedResource);
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
