import { Employee, PrismaClient } from "@prisma/client";
import { IEmployeeRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";
import { Response } from "express";
import { isEmpty } from "lodash";

const prismaClient = new PrismaClient();

export const getList = async (req: IEmployeeRequest, res: any) => {
	const { page, limit } = req.query ?? {};
	const _page = page ? parseInt(page!) : 0;
	const _limit = limit ? parseInt(limit!) : 10;

	const employees = await prismaClient.employee.findMany({
		take: _limit,
		skip: _page * _limit,
		orderBy: {
			fullName: "desc",
		},
	});
	return res.status(200).json(employees);
};
export const update = async (req: IEmployeeRequest, res: Response) => {
	const { id } = req.params;
	const bodyData = req.body;

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
			const { id, ..._updatedEmployee } = Object.assign({}, employee, bodyData);
			const updatedEmployee = await prismaClient.employee.update({
				data: _updatedEmployee,
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
				certificates: true,
				qualitifications: true,
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
