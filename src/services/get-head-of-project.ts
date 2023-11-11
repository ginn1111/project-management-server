import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getHeadOrCreatorOfProject = async (
	idProject: string,
	idEmployee: string,
) => {
	try {
		const headOrCreatorOfProject = await prismaClient.manageProject.findFirst({
			where: {
				idProject,
				endDate: null,
				idEmpHead: idEmployee,
			},
		});

		return headOrCreatorOfProject;
	} catch (error) {
		console.log(error);
	}
};
