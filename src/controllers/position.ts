import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import { IPositionRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";

const PREFIX_KEY = "POST";
const prismaClient = new PrismaClient();

export const getListByEmployee = async (
	req: IPositionRequest,
	res: Response,
) => {
	const { id } = req.params;

	try {
		if (!id) return res.status(422).json("invalid parameters");
		const positionsOfEmployee = await prismaClient.positionsOfEmployee.findMany(
			{
				where: {
					idEmployee: id,
				},
				include: {
					position: true,
				},
				orderBy: {
					startDate: "desc",
				},
			},
		);
		return res.json(positionsOfEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getList = async (req: IPositionRequest, res: Response) => {
	let { page, limit, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	try {
		const totalItems = await prismaClient.position.count({
			where: {
				AND: [
					{
						isActive: true,
					},
				],
				OR: [
					{
						name: {
							contains: search,
						},
					},

					{
						name: {
							startsWith: search,
						},
					},
				],
			},
		});

		const positions = await prismaClient.position.findMany({
			take: _limit,
			skip: _page * _limit,
			where: {
				AND: [
					{
						isActive: true,
					},
				],
				OR: [
					{
						name: {
							contains: search,
						},
					},

					{
						name: {
							startsWith: search,
						},
					},
				],
			},
		});

		return res.status(200).json({ positions, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const update = async (req: IPositionRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}
		const position = await prismaClient.position.findUnique({
			where: {
				id,
			},
		});

		if (isEmpty(position)) return res.status(422).json("invalid parameters");

		const { id: _, ...rest } = position;
		const _updatedPosition = Object.assign(rest, req.body);

		const updatedPosition = await prismaClient.position.update({
			data: {
				..._updatedPosition,
			},
			where: {
				id,
			},
		});

		return res.json(updatedPosition);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const updateByEmployee = async (
	req: IPositionRequest,
	res: Response,
) => {
	const { idRelation } = req.params;
	const { startDate, endDate, ...restBody } = req.body ?? {};

	try {
		if (!idRelation) return res.status(422).json("invalid parameters");

		const positionOfEmployee = await prismaClient.positionsOfEmployee.findFirst(
			{
				where: {
					id: idRelation,
				},
			},
		);

		if (isEmpty(positionOfEmployee))
			return res.status(422).json("invalid parameters");

		const { id, idEmployee, idPosition, ...rest } = positionOfEmployee;
		const _updatedPositionOfEmployee = Object.assign(rest, {
			startDate: startDate ? new Date(startDate).toISOString() : rest.startDate,
			endDate: endDate ? new Date(endDate).toISOString() : rest.endDate,
			...restBody,
		});

		const updatedPositionByEmployee =
			await prismaClient.positionsOfEmployee.update({
				data: _updatedPositionOfEmployee,
				where: {
					id: idRelation,
				},
			});
		return res.json(updatedPositionByEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const addNew = async (req: IPositionRequest, res: Response) => {
	try {
		if (isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}
		const { id, name, ...restBody } = req.body;
		if (!name) return res.status(422).json("invalid parameter");
		const position = await prismaClient.position.create({
			data: {
				id: generateId(PREFIX_KEY),
				name,
				...restBody,
			},
		});
		return res.status(200).json(position);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const addToEmployee = async (
	req: IPositionRequest<{ idEmp: string }>,
	res: Response,
) => {
	const { id, idEmp } = req.params;
	const bodyData = req.body ?? {};

	try {
		if (!id || !idEmp) return res.status(422).json("invalid parameters");

		const positionOfEmp = await prismaClient.positionsOfEmployee.findFirst({
			where: {
				idEmployee: idEmp,
				endDate: null,
			},
			include: {
				position: true,
			},
		});

		if (id === positionOfEmp?.position?.id)
			return res.status(409).json("Chức vụ mới không thể là chức vụ hiện tại");

		if (!isEmpty(positionOfEmp)) {
			await prismaClient.positionsOfEmployee.update({
				where: {
					id: positionOfEmp?.id,
				},
				data: {
					endDate: new Date().toISOString(),
				},
			});
		}

		const positionOfEmployee = await prismaClient.positionsOfEmployee.create({
			data: {
				id: generateId("POEM"),
				idPosition: id,
				idEmployee: idEmp,
				startDate: new Date().toISOString(),
				...bodyData,
			},
		});

		return res.json(positionOfEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getDetail = async (req: IPositionRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422).json("invalid parameters");
		}
		const position = await prismaClient.position.findFirst({
			where: {
				id,
			},
			include: {
				positionsOfEmployee: true,
			},
		});

		return res.status(200).json(position);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const remove = async (req: IPositionRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(422).json("invalid parameters");

		const deletedPosition = await prismaClient.position.update({
			data: {
				isActive: false,
			},
			where: {
				id,
			},
		});
		return res.json(deletedPosition);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
