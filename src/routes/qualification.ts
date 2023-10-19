import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import {
	addNew,
	getDetail,
	getList,
	update,
	addRole,
} from "../controllers/qualification";
import { generateId } from "../utils/generate-id";

const prismaClient = new PrismaClient();
const qualificationRouter = Router();

qualificationRouter.get("/:id/employee", getList);
qualificationRouter.get("/:id", getDetail);
qualificationRouter.post("/add", addNew);
qualificationRouter.patch("/:id/update", update);
qualificationRouter.post("/:id/role", addRole);

qualificationRouter.post("/random-qualification", async (_, res: Response) => {
	const createdQualification = await prismaClient.qualification.create({
		data: {
			id: generateId("QUAL"),
			name: faker.internet.displayName(),
			qualificationsOfEmployee: {
				create: {
					id: generateId("QAEM"),
					date: faker.date.birthdate(),
					idEmployee: "EMPL_01HCYJHDATA3XECHSYBBPNF28K",
					note: faker.string.sample(),
				},
			},
		},
	});
	res.json(createdQualification);
});

export default qualificationRouter;
