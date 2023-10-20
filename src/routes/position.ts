import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import {
	addNew,
	getDetail,
	update,
	getListByEmployee,
	getList,
	updateByEmployee,
	addToEmployee,
	remove,
} from "../controllers/position";
import { generateId } from "../utils/generate-id";

const prismaClient = new PrismaClient();
const positionRouter = Router();

positionRouter.get("/", getList);
positionRouter.get("/:id/employee", getListByEmployee);
positionRouter.get("/:id", getDetail);
positionRouter.post("/add", addNew);
positionRouter.post("/add/:id/:idEmp/employee", addToEmployee);
positionRouter.patch("/:idRelation/update/employee", updateByEmployee);
positionRouter.patch("/:id/update", update);
positionRouter.delete("/:id/remove", remove);

positionRouter.post("/random-position", async (_, res: Response) => {
	const createdPosition = await prismaClient.position.create({
		data: {
			id: generateId("POST"),
			name: faker.internet.displayName(),
			note: faker.string.sample(),
			positionsOfEmployee: {
				create: {
					id: generateId("POEM"),
					idEmployee: "EMPL_01HCYJHDATA3XECHSYBBPNF28K",
					startDate: faker.date.anytime(),
					endDate: faker.date.anytime(),
					note: faker.lorem.paragraph(),
				},
			},
		},
	});
	return res.json(createdPosition);
});

export default positionRouter;
