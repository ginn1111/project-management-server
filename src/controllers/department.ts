import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty, omit } from "lodash";
import { IDepartmentRequest } from "../@types/request";
import { Role } from "../constants/general";
import { getPositionOfEmp } from "../services/get-position";
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
		return res.status(500).json("Server error");
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
			include: {
				employeesOfDepartment: {
					where: {
						endDate: null,
					},
					include: {
						employee: {
							include: {
								positions: {
									where: {
										endDate: null,
									},
									include: {
										position: true,
									},
								},
							},
						},
					},

					orderBy: {
						startDate: "desc",
					},
				},
			},
		});

		return res.status(200).json({ departments, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
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
		const _updatedDepartment = Object.assign(
			{},
			omit(rest, "employeesOfDepartment"),
			req.body,
		);

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
		return res.status(500).json("Server error");
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
		return res.status(500).json("Server error");
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
		return res.status(500).json("Server error");
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

		await prismaClient.$transaction(
			async (tx) => {
				const currentPositionOfEmp = await getPositionOfEmp(idEmp);

				// remove position of emp with TRUONG_PHONG role of old department
				if (currentPositionOfEmp?.position?.code === Role.TRUONG_PHONG) {
					await tx.positionsOfEmployee.update({
						where: {
							id: currentPositionOfEmp.id,
						},
						data: {
							endDate: new Date().toISOString(),
						},
					});
					if (idOld) {
						// if old position is TRUONG_PHONG update idHead of rest department
						const oldDepartment = await tx.employeesOfDepartment.findFirst({
							where: {
								id: idOld,
							},
						});
						if (!oldDepartment?.id) {
							return res
								.status(409)
								.json("Không thể cập nhật lại trưởng phòng cho nhân viên khác");
						}
						await tx.employeesOfDepartment.updateMany({
							where: {
								idDepartment: oldDepartment.idDepartment,
								endDate: null,
							},
							data: {
								idHead: null,
							},
						});
					}
				}

				// if emp have old department
				// make it end
				if (idOld) {
					await tx.employeesOfDepartment.update({
						where: {
							id: idOld,
						},
						// auto make endDate of role is end
						data: {
							endDate: new Date().toISOString(),
							roleOfEmployees: {
								updateMany: {
									where: {
										endDate: null,
									},
									data: {
										endDate: new Date().toISOString(),
									},
								},
							},
						},
					});
				}

				// if emp's department have head
				// update idHead
				const headOfNewDepartment = await tx.employeesOfDepartment.findFirst({
					where: {
						idDepartment: id,
						idHead: null,
						employee: {
							positions: {
								some: {
									position: {
										code: Role.TRUONG_PHONG,
									},
									endDate: null,
								},
							},
						},
						endDate: null,
					},
				});

				const createdDepartmentOfEmployee =
					await tx.employeesOfDepartment.create({
						data: {
							id: generateId("EMDE"),
							idDepartment: id,
							idEmployee: idEmp,
							startDate: new Date().toISOString(),
							idHead: headOfNewDepartment?.id,
							...restBody,
						},
					});

				return res.json(createdDepartmentOfEmployee);
			},
			{
				timeout: 20000,
			},
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
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
		return res.status(500).json("Server error");
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
		return res.status(500).json("Server error");
	}
};
