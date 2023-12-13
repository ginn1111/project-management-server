import { PrismaClient } from "@prisma/client";

export const cancelTask = async (tx: PrismaClient, idTask: string) => {
	const resourceOfTask = await tx.resourceOfTask.findMany({
		where: {
			idTask,
		},
	});

	if (resourceOfTask?.length)
		throw Error("Công việc đã thực hiện, không thể huỷ");

	const cancelTask = await tx.task.update({
		where: {
			id: idTask,
		},
		data: {
			isActive: false,
		},
	});

	return cancelTask;
};
