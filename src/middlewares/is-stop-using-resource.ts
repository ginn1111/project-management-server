import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { ITaskOfWorkRequest } from "../@types/request";

const prismaClient = new PrismaClient();

export const isStopUsingResource = async (
	req: ITaskOfWorkRequest<{ resource: { id: string; amount: number }[] }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { resource } = req.body ?? {};

		if (!resource?.length) return res.status(422).json("invalid parameter");

		// check if resource is stop using
		const dbResource = await Promise.all(
			resource.map(({ id }) =>
				prismaClient.resource.findFirst({
					where: {
						id,
					},
				}),
			),
		);

		const hasStopUsingResource = dbResource.some((r) => !r?.isActive);

		if (hasStopUsingResource)
			return res.status(409).json("Nguồn lực bạn đề xuất đã ngưng sử dụng");

		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
