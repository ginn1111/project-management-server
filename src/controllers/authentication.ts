import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { isEmpty, isNull } from "lodash";
import { IAuthenticationRequest } from "../@types/request";

const prismaClient = new PrismaClient();

function generateAccessToken(payload: any) {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "1d",
	});
}

export const login = async (req: IAuthenticationRequest, res: Response) => {
	const { username, password } = req.body ?? {};
	try {
		if (!username || !password)
			return res.status(422).json("invalid parameters");

		// check exist username
		const account = await prismaClient.account.findFirst({
			where: {
				username,
			},
			include: {
				employee: {
					include: {
						departments: {
							where: {
								endDate: null,
							},
						},
						positions: {
							include: {
								position: true,
							},
						},
					},
				},
			},
		});

		if (isEmpty(account) || !account.isActive)
			return res.status(409).json("Username không tồn tại");

		// compare password
		const isEq = await bcrypt.compare(password, account.password);
		if (!isEq) return res.status(409).json("Mật khẩu hoặc username không đúng");

		const role = account.employee?.positions.find(
			({ endDate }) => !isNull(endDate),
		);

		// return user info with jwt and other info
		return res.json({
			info: {
				...account.employee,
				role: username === "admin" ? "admin" : role,
			},
			accessToken: generateAccessToken({
				id: account.employee?.id,
				username: account.username,
				role,
			}),
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};
export const forgotPassword = (
	req: IAuthenticationRequest,
	res: Response,
) => {};
