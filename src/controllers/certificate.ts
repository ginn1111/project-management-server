import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import { ICertificateRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";

const PREFIX_KEY = "CERT";
const prismaClient = new PrismaClient();

export const getList = async (req: ICertificateRequest, res: Response) => {
	let { page, limit, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	const totalItems = await prismaClient.certificate.count({
		where: {
			OR: [
				{
					name: {
						endsWith: search,
					},
				},
				{
					name: {
						startsWith: search,
					},
				},
			],
		},
	});

	const certificates = await prismaClient.certificate.findMany({
		take: _limit,
		skip: _page * _limit,
		include: {
			certificatesOfEmployee: true,
		},
		where: {
			OR: [
				{
					name: {
						endsWith: search,
					},
				},
				{
					name: {
						startsWith: search,
					},
				},
			],
		},
	});
	return res.status(200).json({ certificates, totalItems });
};

export const update = async (req: ICertificateRequest, res: Response) => {
	const { id } = req.params;
	const { note, date, expiredDate, ...restBody } = req.body;
	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}
		const certificate = await prismaClient.certificate.findUnique({
			where: {
				id,
			},
			include: {
				certificatesOfEmployee: true,
			},
		});

		if (!isEmpty(certificate)) {
			const { certificatesOfEmployee, ...rest } = certificate;
			const _updatedCertificate = Object.assign({}, rest, restBody);

			const updatedCertificate = await prismaClient.certificate.update({
				data: {
					..._updatedCertificate,
				},
				where: {
					id,
				},
			});

			const certRelation = certificatesOfEmployee[0];
			const _updateRelation = Object.assign(certRelation, {
				date: date ? new Date(date).toISOString() : certRelation.date,
				expiredDate: expiredDate
					? new Date(expiredDate).toISOString()
					: certRelation.expiredDate,
				note,
			});
			const updatedRelation =
				await prismaClient.certificationsOfEmployee.update({
					data: _updateRelation,
					where: {
						id: certificatesOfEmployee[0].id,
					},
				});
			return res.status(200).json({ updatedCertificate, updatedRelation });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
export const addNew = async (
	req: ICertificateRequest<{ idEmployee: string }>,
	res: Response,
) => {
	const { id, name, idEmployee, ...restBody } = req.body ?? {};
	try {
		if (!name || !idEmployee) {
			return res.status(422).json("invalid parameters");
		}
		const certificate = await prismaClient.certificate.create({
			data: {
				...restBody,
				name: name,
				id: generateId(PREFIX_KEY),
				certificatesOfEmployee: {
					connect: {
						id: idEmployee,
					},
				},
			},
		});
		return res.status(200).json(certificate);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getDetail = async (req: ICertificateRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422).json("invalid parameters");
		}
		const certificate = await prismaClient.certificate.findFirst({
			where: {
				id,
			},
			include: {
				certificatesOfEmployee: true,
			},
		});

		return res.status(200).json(certificate);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
