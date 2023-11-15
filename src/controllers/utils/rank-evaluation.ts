import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

export const getRankEvaluationWork = async (_: unknown, res: Response) => {
	try {
		const rankEvaluationWork = await prismaClient.rankWorkEvaluation.findMany();

		return res.json({ rankEvaluation: rankEvaluationWork });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const generateRankEvaluationWork = async (_: unknown, res: Response) => {
	const rankEvaluationWork = [
		{
			id: generateId("EVWO"),
			name: "Tốt",
		},
		{
			id: generateId("EVWO"),
			name: "Khá",
		},
		{
			id: generateId("EVWO"),
			name: "Trung bình",
		},
	];
	try {
		await prismaClient.rankWorkEvaluation.createMany({
			data: rankEvaluationWork,
		});

		return res.json("Tạo mức độ đánh giá đầu việc thành công");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
