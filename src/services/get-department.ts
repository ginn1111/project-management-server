import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getDepartment = async (idEmployee: string) => {
	try {
		const department = await prismaClient.employeesOfDepartment.findFirst({
			where: {
				idEmployee: idEmployee,
				endDate: null,
			},
			include: {
				department: true,
			},
		});

		return department;
	} catch (error) {}
};
