import { Customer, PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import { ICustomerRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";
import { checkValidCustomerInfo } from "../services/check-valid-customer-info";

const prismaClient = new PrismaClient();

export const getList = async (req: ICustomerRequest, res: Response) => {
	let { page, limit, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	const customerConditional = {
		OR: [
			{
				fullName: {
					contains: search,
				},
			},
			{
				phone: {
					contains: search,
				},
			},
			{
				identityNumber: {
					contains: search,
				},
			},
		],
		isActive: true,
	};

	try {
		const totalItems = await prismaClient.customer.count({
			where: {
				...customerConditional,
			},
		});

		const customers = await prismaClient.customer.findMany({
			take: _limit,
			skip: _page * _limit,
			where: {
				...customerConditional,
			},
			include: {
				province: true,
				district: true,
				ward: true,
			},
		});

		return res.status(200).json({ customers, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const addNew = async (req: ICustomerRequest, res: Response) => {
	const { fullName, phone, ...rest } = req.body ?? {};
	try {
		if (!fullName || !phone) {
			return res.status(422).json("invalid parameters");
		}

		const msgErr = await checkValidCustomerInfo(req.body as Customer);
		if (msgErr) {
			return res.status(422).json(msgErr);
		}

		const createCustomer = await prismaClient.customer.create({
			data: {
				id: generateId("CUST"),
				fullName,
				phone,
				...rest,
			},
		});

		return res.json(createCustomer);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const update = async (req: ICustomerRequest, res: Response) => {
	const { idCustomer } = req.params ?? {};
	try {
		if (!idCustomer || isEmpty(req.body))
			return res.status(422).json("invalid parameters");

		const msgErr = await checkValidCustomerInfo({
			id: idCustomer,
			...req.body,
		} as Customer);

		if (msgErr) {
			return res.status(422).json(msgErr);
		}

		const updatedCustomer = await prismaClient.customer.update({
			where: {
				id: idCustomer,
			},
			data: {
				...req.body,
			},
		});

		return res.json(updatedCustomer);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const deleteById = async (req: ICustomerRequest, res: Response) => {
	const { idCustomer } = req.params ?? {};
	try {
		if (!idCustomer) return res.status(422).json("invalid parameter");

		const deletedCustomer = await prismaClient.customer.update({
			where: {
				id: idCustomer,
			},
			data: {
				isActive: false,
			},
		});

		return res.json(deletedCustomer);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
