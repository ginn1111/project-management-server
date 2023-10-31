import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import { IDepartmentRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";

const PREFIX_KEY = "DEPA";
const prismaClient = new PrismaClient();

export const getListByEmployee = async (
	req: IDepartmentRequest,
	res: Response,
) => {
	const { id } = req.params;

	try {
		if (!id) return res.status(422).json("invalid parameters");
		const departmentOfEmployee =
			await prismaClient.employeesOfDepartment.findMany({
				where: {
					idEmployee: id,
				},
				include: {
					department: true,
				},
				orderBy: {
					startDate: "desc",
				},
			});
		return res.json(departmentOfEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getList = async (req: IDepartmentRequest, res: Response) => {
	let { page, limit, search = "", idProject = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	try {
		const totalItems = await prismaClient.department.count({
			where: {
				...(idProject
					? {
							projectsOfDepartment: {
								some: {
									idProject,
								},
							},
					  }
					: {}),
				AND: [
					{
						isActive: true,
					},
				],
				OR: [
					{
						name: {
							contains: search,
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

		const departments = await prismaClient.department.findMany({
			take: _limit,
			skip: _page * _limit,
			where: {
				...(idProject
					? {
							projectsOfDepartment: {
								some: {
									idProject,
								},
							},
					  }
					: {}),
				AND: [
					{
						isActive: true,
					},
				],
				OR: [
					{
						name: {
							contains: search,
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

		return res.status(200).json({ departments, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const update = async (req: IDepartmentRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}
		const department = await prismaClient.department.findUnique({
			where: {
				id,
			},
		});

		if (isEmpty(department)) return res.status(422).json("invalid parameters");

		const { id: _, ...rest } = department;
		const _updatedDepartment = Object.assign(rest, req.body);

		const updatedDepartment = await prismaClient.department.update({
			data: {
				..._updatedDepartment,
			},
			where: {
				id,
			},
		});

		return res.json(updatedDepartment);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const updateByEmployee = async (
	req: IDepartmentRequest,
	res: Response,
) => {
	const { idRelation } = req.params;
	const { startDate, endDate, ...restBody } = req.body ?? {};

	try {
		if (!idRelation) return res.status(422).json("invalid parameters");

		const departmentOfEmployee =
			await prismaClient.employeesOfDepartment.findFirst({
				where: {
					id: idRelation,
				},
			});

		if (isEmpty(departmentOfEmployee))
			return res.status(422).json("invalid parameters");

		const { id, idEmployee, idDepartment, ...rest } = departmentOfEmployee;
		const _updatedDepartmentOfEmployee = Object.assign(rest, {
			startDate: startDate ? new Date(startDate).toISOString() : rest.startDate,
			endDate: endDate ? new Date(endDate).toISOString() : rest.endDate,
			...restBody,
		});

		const updatedDepartmentByEmployee =
			await prismaClient.employeesOfDepartment.update({
				data: _updatedDepartmentOfEmployee,
				where: {
					id: idRelation,
				},
			});
		return res.json(updatedDepartmentByEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const addNew = async (req: IDepartmentRequest, res: Response) => {
	try {
		if (isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}
		const { id, ...restBody } = req.body;
		const department = await prismaClient.department.create({
			data: {
				id: generateId(PREFIX_KEY),
				...restBody,
			},
		});
		return res.status(200).json(department);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const addToEmployee = async (
	req: IDepartmentRequest<{ idEmp: string; idOld: string }>,
	res: Response,
) => {
	const { id, idEmp } = req.params;
	const { idOld, ...restBody } = req.body ?? {};

	try {
		if (!id || !idEmp) return res.status(422).json("invalid parameters");

		if (idOld) {
			await prismaClient.employeesOfDepartment.update({
				where: {
					id: idOld,
				},
				data: {
					endDate: new Date().toISOString(),
				},
			});
		}

		const createdDepartmentOfEmployee =
			await prismaClient.employeesOfDepartment.create({
				data: {
					id: generateId("EMDE"),
					idDepartment: id,
					idEmployee: idEmp,
					startDate: new Date().toISOString(),
					...restBody,
				},
			});

		return res.json(createdDepartmentOfEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const getDetail = async (req: IDepartmentRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422).json("invalid parameters");
		}
		const department = await prismaClient.department.findFirst({
			where: {
				id,
			},
			include: {
				employeesOfDepartment: true,
			},
		});

		return res.status(200).json(department);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export const remove = async (req: IDepartmentRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(422).json("invalid parameters");

		const deletedDepartment = await prismaClient.department.update({
			data: {
				isActive: false,
			},
			where: {
				id,
			},
		});
		return res.json(deletedDepartment);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
