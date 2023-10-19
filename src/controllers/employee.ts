import { Employee, PrismaClient } from "@prisma/client";
import { IEmployeeRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";
import { Response } from "express";
import { isEmpty } from "lodash";

const prismaClient = new PrismaClient();

export const getList = async (req: IEmployeeRequest, res: any) => {
	let { page, limit, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	const totalItems = await prismaClient.employee.count({
		where: {
			AND: [{ isActive: true }],
			OR: [
				{
					fullName: {
						endsWith: search,
					},
				},
				{
					fullName: {
						startsWith: search,
					},
				},
				{
					identifyNumber: {
						endsWith: search,
					},
				},
				{
					identifyNumber: {
						startsWith: search,
					},
				},
				{
					phone: {
						endsWith: search,
					},
				},
				{
					phone: {
						startsWith: search,
					},
				},
			],
		},
		orderBy: {
			fullName: "desc",
		},
	});

	const employees = await prismaClient.employee.findMany({
		take: _limit,
		skip: _page * _limit,
		where: {
			AND: [{ isActive: true }],
			OR: [
				{
					fullName: {
						endsWith: search,
					},
				},
				{
					fullName: {
						startsWith: search,
					},
				},
				{
					identifyNumber: {
						endsWith: search,
					},
				},
				{
					identifyNumber: {
						startsWith: search,
					},
				},
				{
					phone: {
						endsWith: search,
					},
				},
				{
					phone: {
						startsWith: search,
					},
				},
			],
		},
		orderBy: {
			fullName: "desc",
		},
	});
	return res.status(200).json({ employees, totalItems });
};
export const update = async (req: IEmployeeRequest, res: Response) => {
	const { id } = req.params;
	const bodyData = req.body;
	console.log(bodyData);

	try {
		if (!id || isEmpty(bodyData)) {
			return res.status(422).send();
		}
		const employee = await prismaClient.employee.findUnique({
			where: {
				id,
			},
		});

		if (!isEmpty(employee)) {
			const { id, birthday, ..._updatedEmployee } = Object.assign(
				{},
				employee,
				bodyData,
			);
			const updatedEmployee = await prismaClient.employee.update({
				data: {
					..._updatedEmployee,
					birthday: birthday ? new Date(birthday).toISOString() : undefined,
				},
				where: {
					id,
				},
			});
			return res.status(200).json(updatedEmployee);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
export const addNew = async (req: IEmployeeRequest, res: Response) => {
	try {
		const employee = await prismaClient.employee.create({
			data: {
				...(req.body as Employee),
				id: generateId("EMPL"),
				birthday: req.body?.birthday
					? new Date(req.body.birthday).toISOString()
					: null,
			},
		});
		return res.status(200).json(employee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getDetail = async (req: IEmployeeRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422);
		}
		const employee = await prismaClient.employee.findFirst({
			where: {
				id,
			},
			include: {
				departments: true,
				certificates: true,
				qualitifications: true,
				projects: true,
				ward: {
					include: {
						ditrict: {
							include: {
								province: true,
							},
						},
					},
				},
			},
		});

		return res.status(200).json(employee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
export const remove = async (req: IEmployeeRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422);
		}
		const employee = await prismaClient.employee.update({
			data: {
				isActive: false,
			},
			where: {
				id,
			},
		});

		return res.status(200).json(employee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
