import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty, pick } from "lodash";
import { generateId } from "../utils/generate-id";
import { IQualificationRequest } from "../@types/request";

const PREFIX_KEY = "QUAL";
const prismaClient = new PrismaClient();

export const getList = async (req: IQualificationRequest, res: Response) => {
	let { page, limit, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	const totalItems = await prismaClient.qualification.count({
		where: {
			OR: [
				{
					name: {
						endsWith: search,
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

	const qualifications = await prismaClient.qualification.findMany({
		take: _limit,
		skip: _page * _limit,
		where: {
			OR: [
				{
					name: {
						endsWith: search,
					},
				},
				{
					name: {
						startsWith: search,
					},
				},
			],
		},
		include: {
			qualificationsOfEmployee: true,
			rolesOfEmployee: true,
		},
	});
	return res.status(200).json({ qualifications, totalItems });
};

export const update = async (req: IQualificationRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}
		const qualification = await prismaClient.qualification.findUnique({
			where: {
				id,
			},
			include: {
				qualificationsOfEmployee: true,
			},
		});

		const { date, note, ...restBody } = req.body;
		console.log(qualification?.qualificationsOfEmployee);

		if (!isEmpty(qualification)) {
			const { qualificationsOfEmployee, ...rest } = qualification;
			const _updatedQualification = Object.assign({}, rest, restBody);

			const updatedQualification = await prismaClient.qualification.update({
				data: {
					..._updatedQualification,
				},
				where: {
					id,
				},
			});

			const _updatedRelation = Object.assign(
				qualification.qualificationsOfEmployee[0],
				{
					...(date ? { date: new Date(date).toISOString(), note } : { note }),
				},
			);
			const updatedRelation =
				await prismaClient.qualificationsOfEmployee.update({
					data: _updatedRelation,
					where: {
						id: qualification.qualificationsOfEmployee[0].id,
					},
				});
			return res.status(200).json({ updatedQualification, updatedRelation });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
export const addNew = async (
	req: IQualificationRequest<{ idEmployee: string }>,
	res: Response,
) => {
	const { id, date, name, idEmployee, ...restBody } = req.body ?? {};
	try {
		if (!name || !idEmployee || !date) {
			return res.status(422).json("invalid parameters");
		}
		const qualification = await prismaClient.qualification.create({
			data: {
				...restBody,
				name: name,
				id: generateId(PREFIX_KEY),
				qualificationsOfEmployee: {
					create: {
						id: generateId("QAEM"),
						idEmployee,
						date: new Date(date).toISOString(),
					},
				},
			},
		});
		return res.status(200).json(qualification);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getDetail = async (req: IQualificationRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422).json("invalid parameters");
		}
		const qualification = await prismaClient.qualification.findFirst({
			where: {
				id,
			},
			include: {
				qualificationsOfEmployee: true,
			},
		});

		return res.status(200).json(qualification);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const addRole = async (req: IQualificationRequest, res: Response) => {
	const { id } = req.params;
	try {
	} catch (error) {}
};

export const endRole = async (req: IQualificationRequest, res: Response) => {};
