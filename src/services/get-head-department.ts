import { PrismaClient } from "@prisma/client";
import { Role } from "../constants/general";

const prismaClient = new PrismaClient();

export const getHeadOfDepartment = async (idDepartment: string) => {
	try {
		const headOfDepartment = await prismaClient.employeesOfDepartment.findFirst(
			{
				where: {
					idDepartment,
					idHead: null,
					employee: {
						positions: {
							some: {
								position: {
									code: Role.TRUONG_PHONG,
								},
								endDate: null,
							},
						},
					},
					endDate: null,
				},
			},
		);

		return headOfDepartment;
	} catch (error) {
		console.log(error);
	}
};
