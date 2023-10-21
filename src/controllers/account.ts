import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Response } from "express";
import { isEmpty, isNil, omit } from "lodash";
import { IAccountRequest } from "../@types/request";
import { ROUND_SALT } from "../constants/authentication";
import { generateId } from "../utils/generate-id";

const prismaClient = new PrismaClient();

export const getList = async (req: IAccountRequest, res: Response) => {
	let { page, limit, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	try {
		const totalItems = await prismaClient.account.count({
			where: {
				AND: [
					{
						isActive: true,
					},
				],
				OR: [
					{
						username: {
							endsWith: search,
						},
					},

					{
						username: {
							startsWith: search,
						},
					},
				],
			},
		});

		const accounts = await prismaClient.account.findMany({
			take: _limit,
			skip: _page * _limit,
			select: {
				username: true,
				employees: true,
				isActive: true,
			},
			where: {
				AND: [
					{
						isActive: true,
					},
				],
				OR: [
					{
						username: {
							endsWith: search,
						},
					},

					{
						username: {
							startsWith: search,
						},
					},
				],
			},
		});

		return res.status(200).json({ accounts, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const changPwd = async (
	req: IAccountRequest<{ oldPwd: string }>,
	res: Response,
) => {
	const { oldPwd, password, username } = req.body ?? {};

	try {
		if (!oldPwd || !password || !username) {
			return res.status(422).json("invalid parameters");
		}

		const account = await prismaClient.account.findUnique({
			where: {
				username,
			},
		});

		if (isEmpty(account))
			return res.status(409).json("Tài khoản không tồn tại!");

		const isEqualPwd = await bcrypt.compare(oldPwd, account.password);

		if (!isEqualPwd) return res.status(409).json("Mật khẩu cũ không đúng");

		const newHashPwd = await bcrypt.hash(password, ROUND_SALT);

		const updatedAccount = await prismaClient.account.update({
			where: {
				username,
			},
			data: {
				password: newHashPwd,
			},
		});

		return res.json(omit(updatedAccount, "password"));
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const addNew = async (
	req: IAccountRequest<{ idEmployee: string }>,
	res: Response,
) => {
	const { username, password } = req.body ?? {};
	try {
		if (!username || !password) {
			return res.status(422).json("invalid parameters");
		}

		const isExistAccount = await prismaClient.account.findUnique({
			where: {
				username,
			},
		});

		if (isExistAccount) return res.status(409).json("Tài khoản đã tồn tại!");

		const bcryptPwd = await bcrypt.hash(password, ROUND_SALT);

		const account = await prismaClient.account.create({
			data: {
				username,
				password: bcryptPwd,
			},
		});
		return res.status(200).json(omit(account, "password"));
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getDetail = async (req: IAccountRequest, res: Response) => {
	const { username } = req.body ?? {};
	console.log(username);
	try {
		if (!username) {
			return res.status(422).json("invalid parameters");
		}
		const account = await prismaClient.account.findUnique({
			where: {
				username,
			},
			include: {
				employees: true,
			},
		});

		if (isEmpty(account))
			return res.status(409).json("Tài khoản không tồn tại");

		return res.status(200).json(omit(account, "password"));
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const addToEmployee = async (req: IAccountRequest, res: Response) => {
	const { id } = req.params;
	const { username } = req.body ?? {};

	try {
		if (!username || !id) return res.status(422).json("invalid parameters");

		const updatedAccount = await prismaClient.accountEmployee.create({
			data: {
				id: generateId("ACEM"),
				createdDate: new Date().toISOString(),
				idEmployee: id,
				username,
			},
		});

		return res.json(updatedAccount);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const active = async (req: IAccountRequest, res: Response) => {
	const { isActive, username } = req.body ?? {};

	try {
		if (isNil(isActive) || !username)
			return res.status(422).json("invalid parameters");

		const updatedAccount = await prismaClient.account.update({
			where: {
				username,
			},
			data: {
				isActive,
			},
		});

		return res.json(omit(updatedAccount, "password"));
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
