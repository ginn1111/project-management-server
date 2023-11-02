import { Employee } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
			// If error occurs in verify process, sent error
			if (err) {
				return res.status(403).json("You are not authorized 1!");
			}
			// next(): pass this middleware and come to the next request
			if (user) {
				res.locals.idEmpLogin = (user as Employee).id;
			}
			next();
		});
	} else {
		// sent error if 'token' does not exist
		return res.status(401).json("You are not authenticated!");
	}
};
