import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getPositionOfEmp = async (idEmp: string) => {
	try {
		const positionOfEmp = await prismaClient.positionsOfEmployee.findFirst({
			where: {
				endDate: null,
				idEmployee: idEmp,
			},
			include: {
				position: true,
			},
		});

		return positionOfEmp;
	} catch (error) {
		console.log(error);
	}
};
