import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaClient = new PrismaClient();

export const getProvinces = async (_: any, res: Response) => {
	try {
		const provinceList = await prismaClient.province.findMany();
		return res.json(provinceList);
	} catch (error) {
		res.status(500).json("Server error");
	}
};

export const getDistricts = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(422).json("");

		const districtList = await prismaClient.district.findMany({
			where: {
				idProvince: id,
			},
		});

		return res.json(districtList);
	} catch (error) {
		res.status(500).json("Server error");
	}
};

export const getWards = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(422).json("");

		const wardList = await prismaClient.ward.findMany({
			where: {
				idDistrict: id,
			},
		});

		return res.json(wardList);
	} catch (error) {
		res.status(500).json("Server error");
	}
};
