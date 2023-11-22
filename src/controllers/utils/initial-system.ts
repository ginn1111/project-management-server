import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ROUND_SALT } from "../../constants/authentication";
import { generateId } from "../../utils/generate-id";
import { StatePropose } from "../../constants/review";
import { importData } from "../../utils/import-province-district-ward";
import { PERMISSION, Role } from "../../constants/general";

const prismaClient = new PrismaClient();

export const initialSystem = async () => {
	await prismaClient.$transaction(async (tx) => {
		// create super admin account
		// const adminEmp = await tx.employee.create({
		// 	data: {
		// 		id: generateId("EMPL"),
		// 		fullName: "Admin",
		// 		gender: "OTHER",
		// 		departments: {
		// 			create: {
		// 				id: generateId("DEEM"),
		// 				startDate: new Date().toISOString(),
		// 				department: {
		// 					create: {
		// 						id: generateId("DEPA"),
		// 						name: "Quản lý",
		// 					},
		// 				},
		// 			},
		// 		},
		// 		positions: {
		// 			create: {
		// 				id: generateId("POEM"),
		// 				startDate: new Date().toISOString(),
		// 				position: {
		// 					create: {
		// 						id: generateId("POST"),
		// 						name: "Quản lý trưởng phòng",
		// 						code: Role.QUAN_LY_TRUONG_PHONG,
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// });

		// await tx.account.create({
		// 	data: {
		// 		username: "superadmin",
		// 		password: bcrypt.hashSync("admin", ROUND_SALT),
		// 		idEmployee: adminEmp.id,
		// 	},
		// });

		// create state of propose
		// await tx.statePropose.createMany({
		// 	data: [
		// 		{
		// 			id: generateId("STATE"),
		// 			name: StatePropose.Approve,
		// 		},
		// 		{
		// 			id: generateId("STATE"),
		// 			name: StatePropose.Pending,
		// 		},
		// 		{
		// 			id: generateId("STATE"),
		// 			name: StatePropose.Reject,
		// 		},
		// 	],
		// });

		// create resource type
		// await prismaClient.resourceType.createMany({
		// 	data: [
		// 		{
		// 			id: generateId("RETY"),
		// 			name: "Vật tư",
		// 		},
		// 		{
		// 			id: generateId("RETY"),
		// 			name: "Công cụ",
		// 		},
		// 		{
		// 			id: generateId("RETY"),
		// 			name: "Nguyên liệu",
		// 		},
		// 	],
		// });

		// create rank of evaluation work
		// await tx.rankWorkEvaluation.createMany({
		// 	data: [
		// 		{
		// 			id: generateId("RAWO"),
		// 			name: "Tốt",
		// 		},
		// 		{
		// 			id: generateId("RAWO"),
		// 			name: "Khá",
		// 		},
		// 		{
		// 			id: generateId("RAWO"),
		// 			name: "Trung bình",
		// 		},
		// 	],
		// });
		// importData();

		// generate permission of work
		await tx.permissionWork.create({
			data: {
				id: generateId("PEWO"),
				name: "Xem",
				code: PERMISSION.XEM,
			},
		});
		return;
	});
};
