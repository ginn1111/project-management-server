import { Response } from "express";
import { IResourceRequest } from "../@types/request";
import { PrismaClient } from "@prisma/client";
import { generateId } from "../utils/generate-id";
import { isEmpty, isNil } from "lodash";

const prismaClient = new PrismaClient();

export const getList = async (req: IResourceRequest, res: Response) => {
	const {
		page,
		limit,
		search = "",
		idResourceType,
		idProject,
	} = req.query ?? {};
	const _page = !isNaN(page as any) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.resource.count({
			where: {
				name: {
					contains: search || undefined,
				},
				idResourceType: idResourceType || undefined,
				...(idProject
					? {
							resourceProject: {
								some: {
									idProject,
								},
							},
					  }
					: {}),
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
				...(idProject
					? {
							resourceProject: {
								some: {
									idProject,
								},
							},
					  }
					: {}),
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

export const toggleUsing = async (req: IResourceRequest, res: Response) => {
	try {
		const { id } = req.params;
		const { isActive } = req.body ?? {};

		if (!id || isNil(isActive))
			return res.status(422).json("invalid parameter");

		await prismaClient.resource.update({
			where: {
				id,
			},
			data: {
				isActive,
			},
		});

		return res.json("Tạm dừng sử dụng nguồn lực");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const returnResource = async (req: IResourceRequest, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) return res.status(422).json("invalid parameter");

		const resourceProject = await prismaClient.projectResource.findFirst({
			where: {
				id,
			},
			include: {
				resource: true,
			},
		});

		if (!resourceProject)
			return res.status(409).json("Nguồn lực không tồn tại trong dự án");

		const resource = await prismaClient.resource.findFirst({
			where: {
				id: resourceProject.idResource as string,
			},
		});

		if (!resource) return res.status(409).json("Nguồn lực không tồn tại");

		await prismaClient.$transaction(async (tx) => {
			await tx.projectResource.update({
				where: {
					id,
				},
				data: {
					amount: 0,
				},
			});

			await tx.resource.update({
				where: {
					id: resource.id,
				},
				data: {
					amount: resourceProject.amount + resource.amount,
				},
			});
		});

		return res.json("Hoàn tác nguồn lực thành công");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
