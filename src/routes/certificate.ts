import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import { addNew, getDetail, getList, update } from "../controllers/certificate";
import { generateId } from "../utils/generate-id";

const prismaClient = new PrismaClient();
const certificateRouter = Router();

certificateRouter.get("/:id/employee", getList);
certificateRouter.get("/:id", getDetail);
certificateRouter.post("/add", addNew);
certificateRouter.patch("/:id/update", update);

certificateRouter.post("/random-cer", async (_, res: Response) => {
	const createdCert = await prismaClient.certificate.create({
		data: {
			id: generateId("CERT"),
			name: faker.internet.displayName(),
			certificatesOfEmployee: {
				create: {
					id: generateId("CEEM"),
					idEmployee: "EMPL_01HCYJHDATA3XECHSYBBPNF28K",
				},
			},
		},
	});
	return res.json(createdCert);
});

export default certificateRouter;
