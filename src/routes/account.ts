import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Response, Router } from "express";
import { ROUND_SALT } from "../constants/authentication";
import {
	active,
	addNew,
	getDetail,
	getList,
	update,
} from "../controllers/account";

const prismaClient = new PrismaClient();
const accountRouter = Router();

accountRouter.get("/", getList);
accountRouter.post("/detail", getDetail);
// accountRouter.post("/:id/employee", addToEmployee);
accountRouter.post("/add", addNew);
accountRouter.post("/active", active);
accountRouter.patch("/update", update);

accountRouter.post("/random-account", async (_, res: Response) => {
	const bcryptPwd = await bcrypt.hash("Thuandz123", ROUND_SALT);

	const createdAccount = await prismaClient.account.create({
		data: {
			username: faker.internet.userName(),
			password: bcryptPwd,
		},
	});

	res.json(createdAccount);
});

export default accountRouter;
