import { Account, Employee, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isEmpty } from "lodash";

const prismaClient = new PrismaClient();

// This middleware use to check whether the user logged in
export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Take the 'token' from headers['x-authorization']
	const authHeader = req.headers["x-authorization"];

	// If 'token' exists, verify it
	if (authHeader) {
		// Sent headers['x-authorization'] in form `Bearer <token>`,
		// split it by a space and take the second elements => the needed token
		const token = (authHeader as string).split(" ")[1];
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, async (err, user) => {
			// If error occurs in verify process, sent error
			if (err) {
				return res.status(403).json("You are not authorized 1!");
			}
			// next(): pass this middleware and come to the next request
			if (isUser(user)) {
				const empLogin = await prismaClient.account.findFirst({
					where: {
						username: user.username,
					},
				});
				if (isEmpty(empLogin))
					return res.status(401).json("You are not authenticated!");
				res.locals.idEmpLogin = user.id;
			}
			next();
		});
	} else {
		// sent error if 'token' does not exist
		return res.status(401).json("You are not authenticated!");
	}
};

const isUser = (
	user: JwtPayload | string | undefined,
): user is Account & Employee => {
	return !!user;
};
