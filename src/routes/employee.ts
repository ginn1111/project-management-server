import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import {
	addNew,
	getDetail,
	getList,
	remove,
	update,
} from "../controllers/employee";
import { generateId } from "../utils/generate-id";

const prismaClient = new PrismaClient();
const employeeRouter = Router();

employeeRouter.get("/", getList);
employeeRouter.get("/:id", getDetail);
employeeRouter.post("/add", addNew);
employeeRouter.delete("/:id/remove", remove);
employeeRouter.patch("/:id/update", update);

employeeRouter.post("/random-emp", async (_, res: Response) => {
	const randomEmpList = Array(20)
		.fill(0)
		.map(() => ({
			id: generateId("EMPL"),
			address: faker.location.secondaryAddress(),
			email: faker.internet.email(),
			fullName: faker.person.fullName(),
			gender: Math.floor(Math.random()) > 0.5 ? "NAM" : "NU",
			phone: faker.phone.number(),
		}));
	await prismaClient.employee.createMany({ data: randomEmpList });
	res.json("ok");
});

export default employeeRouter;
