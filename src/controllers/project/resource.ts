import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { IProjectResourceRequest } from "../../@types/request";

const prismaClient = new PrismaClient();

export const getList = async (req: IProjectResourceRequest, res: Response) => {
	const { id } = req.params;
	const { page, limit, idResourceType, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;
	try {
		const totalItems = await prismaClient.projectResource.count({
			where: {
				idProject: id,
				...(idResourceType
					? {
							resource: {
								name: {
									contains: search || undefined,
								},
								idResourceType,
							},
					  }
					: null),
			},
		});

		const projectResource = await prismaClient.projectResource.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				idProject: id,
				...(idResourceType
					? {
							resource: {
								name: {
									contains: search || undefined,
								},
								idResourceType,
							},
					  }
					: null),
			},
			include: {
				resource: { include: { resourceType: true } },
				resourceOfTasks: {
					include: {
						resource: true,
					},
				},
			},
		});
		return res.json({ projectResource, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
