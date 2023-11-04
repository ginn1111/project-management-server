import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getEmpOfProject = async (
	idProject: string,
	idEmployee: string,
) => {
	try {
		const empOfProject = await prismaClient.employeesOfProject.findFirst({
			where: {
				idProject,

				proposeProject: {
					employeesOfDepartment: {
						idEmployee,
					},
				},
				endDate: null,
			},
		});

		return empOfProject;
	} catch (error) {
		console.log(error);
	}
};
