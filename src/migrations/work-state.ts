import { PrismaClient, WorkState } from "@prisma/client";
import { generateId } from "../utils/generate-id";

const prisma = new PrismaClient();

export const WorkStateNames = {
	Planing: "Lên kế hoạch",
	Processing: "Đang thực hiện",
	Canceled: "Huỷ bỏ",
	Done: "Hoàn thành",
};

// (async () => {
// 	try {
// 		const states = [
// 			{
// 				id: generateId("WOST"),
// 				name: WorkStateNames.Planing,
// 			},
// 			{
// 				id: generateId("WOST"),
// 				name: WorkStateNames.Processing,
// 			},
// 			{
// 				id: generateId("WOST"),
// 				name: WorkStateNames.Canceled,
// 			},
// 			{
// 				id: generateId("WOST"),
// 				name: WorkStateNames.Done,
// 			},
// 		];
// 		console.log("Đang insert ...");
// 		await prisma.workState.createMany({
// 			data: states,
// 		});
// 		console.log("Thành công ...");
// 	} catch (error) {
// 		console.log(error);
// 	}
// })();
