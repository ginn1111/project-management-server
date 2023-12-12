import { PrismaClient } from "@prisma/client";
import { WorkStateNames } from "../../migrations/work-state";

export const processingWork = async (tx: PrismaClient, idWork: string) => {
	const processingState = await tx.workState.findFirst({
		where: {
			isActive: true,
			name: WorkStateNames.Processing,
		},
	});

	const work = await tx.work.findFirst({
		where: {
			id: idWork,
		},
		include: {
			state: true,
		},
	});

	// just allow processing work from planing
	if (!processingState || !work || work?.state?.name !== WorkStateNames.Planing)
		return null;

	const processingWork = await tx.work.update({
		where: {
			id: idWork,
		},
		data: {
			idState: processingState.id,
		},
	});

	return processingWork;
};

export const cancelWork = async (tx: PrismaClient, idWork: string) => {
	const cancelState = await tx.workState.findFirst({
		where: {
			isActive: true,
			name: WorkStateNames.Canceled,
		},
	});

	const work = await tx.work.findFirst({
		where: {
			id: idWork,
		},
		include: {
			state: true,
		},
	});

	// just allow cancel with planing state
	if (!cancelState || !work || work.state?.name !== WorkStateNames.Planing)
		return null;

	const canceledWork = await tx.work.update({
		where: {
			id: idWork,
		},
		data: {
			idState: cancelState.id,
		},
	});

	return canceledWork;
};
