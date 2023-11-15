import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Response } from "express";
import { isEmpty, isNil, omit } from "lodash";
import { IAccountRequest } from "../@types/request";
import { ROUND_SALT } from "../constants/authentication";

const prismaClient = new PrismaClient();

export const getList = async (req: IAccountRequest, res: Response) => {
	let { page, limit, search = "", idDepartment } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	try {
		const totalItems = await prismaClient.account.count({
			where: {
				OR: [
					{
						username: {
							contains: search,
						},
					},
				],
				...(idDepartment
					? {
							employee: {
								departments: {
									some: {
										endDate: null,
										idDepartment,
									},
								},
							},
					  }
					: null),
			},
		});

		const accounts = await prismaClient.account.findMany({
			take: _limit,
			skip: _page * _limit,
			select: {
				username: true,
				isActive: true,
				note: true,
				employee: true,
			},
			where: {
				OR: [
					{
						username: {
							contains: search,
						},
					},
				],
				...(idDepartment
					? {
							employee: {
								departments: {
									some: {
										endDate: null,
										idDepartment,
									},
								},
							},
					  }
					: null),
			},
		});

		return res.status(200).json({ accounts, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

// export const changPwd = async (
// 	req: IAccountRequest<{ oldPwd: string }>,
// 	res: Response,
// ) => {
// 	const { oldPwd, password, username } = req.body ?? {};

// 	try {
// 		if (!oldPwd || !password || !username) {
// 			return res.status(422).json("invalid parameters");
// 		}

// 		const account = await prismaClient.account.findUnique({
// 			where: {
// 				username,
// 			},
// 		});

// 		if (isEmpty(account))
// 			return res.status(409).json("Tài khoản không tồn tại!");

// 		const isEqualPwd = await bcrypt.compare(oldPwd, account.password);

// 		if (!isEqualPwd) return res.status(409).json("Mật khẩu cũ không đúng");

// 		const newHashPwd = await bcrypt.hash(password, ROUND_SALT);

// 		const updatedAccount = await prismaClient.account.update({
// 			where: {
// 				username,
// 			},
// 			data: {
// 				password: newHashPwd,
// 			},
// 		});

// 		return res.json(omit(updatedAccount, "password"));
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json("Server error");
// 	}
// };

export const addNew = async (
	req: IAccountRequest<{ idEmployee: string }>,
	res: Response,
) => {
	const { username, password, ...rest } = req.body ?? {};
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
				...rest,
			},
		});
		return res.status(200).json(omit(account, "password"));
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const update = async (req: IAccountRequest, res: Response) => {
	const { password, username, note } = req.body ?? {};
	try {
		if (!(note || password) || !username)
			return res.status(422).json("invalid parameters");

		const account = await prismaClient.account.findFirst({
			where: {
				username,
			},
		});

		if (isEmpty(account)) return res.status(422).json("invalid parameters");

		const newHahsPwd = password ? await bcrypt.hash(password, ROUND_SALT) : "";

		const _updatedAccount = Object.assign({}, account, {
			note: note || account?.note,
			password: newHahsPwd || account?.password,
		});

		const updatedAccount = await prismaClient.account.update({
			where: {
				username,
			},
			data: _updatedAccount,
		});
		return res.json(updatedAccount);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const getDetail = async (req: IAccountRequest, res: Response) => {
	const { username } = req.body ?? {};
	try {
		if (!username) {
			return res.status(422).json("invalid parameters");
		}
		const account = await prismaClient.account.findUnique({
			where: {
				username,
			},
		});

		if (isEmpty(account))
			return res.status(409).json("Tài khoản không tồn tại");

		return res.status(200).json(omit(account, "password"));
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const addToEmployee = async (req: IAccountRequest, res: Response) => {
	const { id } = req.params;
	const { username, password, ...restBody } = req.body ?? {};

	try {
		if (!username || !id) return res.status(422).json("invalid parameters");

		const existAccount = await prismaClient.account.findFirst({
			where: {
				AND: [{ username, idEmployee: id }],
			},
		});

		if (!isEmpty(existAccount))
			return res
				.status(409)
				.json("Mỗi nhân viên chỉ sử dụng được một tài khoản");

		const newAccount = await prismaClient.account.create({
			data: {
				username,
				password,
				idEmployee: id,
				...restBody,
			},
		});

		return res.json(newAccount);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Lỗi hệ thống, vui lòng liên hệ với quản trị!");
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
		return res.status(500).json("Server error");
	}
};
