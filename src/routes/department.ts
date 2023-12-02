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
} from "../controllers/department";
import { generateId } from "../utils/generate-id";

const prismaClient = new PrismaClient();
const departmentRouter = Router();

departmentRouter.get("/", getList);
departmentRouter.get("/:id/employee", getListByEmployee);
departmentRouter.get("/:id", getDetail);
departmentRouter.post("/add", addNew);
departmentRouter.post("/add/:id/:idEmp/employee", addToEmployee);
departmentRouter.patch("/:idRelation/update/employee", updateByEmployee);
departmentRouter.patch("/:id/update", update);
departmentRouter.delete("/:id/remove", remove);

departmentRouter.post("/random-depa", async (_, res: Response) => {
	const createdDepartment = await prismaClient.department.create({
		data: {
			id: generateId("DEPA"),
			name: faker.internet.displayName(),
			note: faker.string.sample(),
			phone: faker.phone.number(),
			employeesOfDepartment: {
				create: {
					id: generateId("EMDE"),
					idEmployee: "EMPL_01HCYJHDATA3XECHSYBBPNF28K",
					startDate: new Date().toISOString(),
				},
			},
		},
	});
	return res.json(createdDepartment);
});

export default departmentRouter;
