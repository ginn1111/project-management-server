import { Employee, PrismaClient } from "@prisma/client";
import { IEmployeeRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";
import { Response } from "express";
import { isEmpty, omit } from "lodash";

const PREFIX_KEY = "EMPL";
const prismaClient = new PrismaClient();

export const getList = async (req: IEmployeeRequest, res: any) => {
	let { page, limit, search = "", idDepartment, code } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	try {
		const totalItems = await prismaClient.employee.count({
			where: {
				...(code
					? {
							positions: {
								some: {
									position: {
										code,
									},
									endDate: null,
								},
							},
					  }
					: null),
				AND: [
					{ isActive: true },
					{
						...((idDepartment
							? {
									departments: {
										some: {
											idDepartment,
											endDate: null,
										},
									},
							  }
							: {}) as any),
					},
				],
				OR: [
					{
						fullName: {
							contains: search,
						},
					},
					{
						identifyNumber: {
							contains: search,
						},
					},
					{
						phone: {
							contains: search,
						},
					},
				],
			},
			orderBy: {
				fullName: "desc",
			},
		});

		const employees = await prismaClient.employee.findMany({
			take: _limit,
			skip: _page * _limit,

			include: {
				account: true,
				departments: {
					include: {
						department: true,
					},
				},
				positions: {
					include: {
						position: true,
					},
				},
				ward: true,
				district: true,
				province: true,
			},
			where: {
				...(code
					? {
							positions: {
								some: {
									position: {
										code,
									},
									endDate: null,
								},
							},
					  }
					: null),
				AND: [
					{ isActive: true },
					{
						...((idDepartment
							? {
									departments: {
										some: {
											idDepartment,
											endDate: null,
										},
									},
							  }
							: {}) as any),
					},
				],
				OR: [
					{
						fullName: {
							contains: search,
						},
					},
					{
						identifyNumber: {
							contains: search,
						},
					},
					{
						phone: {
							contains: search,
						},
					},
				],
			},
			orderBy: {
				fullName: "desc",
			},
		});
		return res.status(200).json({ employees, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const update = async (req: IEmployeeRequest, res: Response) => {
	const { id } = req.params;
	const bodyData = omit(req.body, ["account", "departments"]) ?? {};

	try {
		if (!id || isEmpty(bodyData)) {
			return res.status(422).json("invalid parameters");
		}
		const employee = await prismaClient.employee.findUnique({
			where: {
				id,
			},
		});

		if (!isEmpty(employee)) {
			const { id, birthday, ..._updatedEmployee } = Object.assign(
				{},
				employee,
				bodyData,
			);
			const updatedEmployee = await prismaClient.employee.update({
				data: {
					..._updatedEmployee,
					birthday: birthday ? new Date(birthday).toISOString() : undefined,
				},
				where: {
					id,
				},
			});
			return res.status(200).json(updatedEmployee);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const addNew = async (req: IEmployeeRequest, res: Response) => {
	try {
		const employee = await prismaClient.employee.create({
			data: {
				...(req.body as Employee),
				id: generateId(PREFIX_KEY),
				birthday: req.body?.birthday
					? new Date(req.body.birthday).toISOString()
					: null,
			},
		});
		return res.status(200).json(employee);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const getDetail = async (req: IEmployeeRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422).json("invalid parameters");
		}
		const employee = await prismaClient.employee.findFirst({
			where: {
				id,
			},
			include: {
				departments: {
					include: {
						department: true,
					},
				},
				certificates: {
					include: {
						certification: true,
					},
				},
				qualifications: {
					include: {
						qualification: {
							include: {
								rolesOfEmployee: true,
							},
						},
					},
				},
				positions: {
					include: {
						position: true,
					},
				},
				ward: {
					include: {
						district: {
							include: {
								province: true,
							},
						},
					},
				},
			},
		});

		return res.status(200).json(employee);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const remove = async (req: IEmployeeRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422);
		}
		await prismaClient.$transaction(async (tx) => {
			const employee = await tx.employee.update({
				data: {
					isActive: false,
				},
				where: {
					id,
				},
				include: {
					account: true,
				},
			});

			await tx.account.delete({
				where: {
					username: employee.account?.username,
				},
			});

			return res.status(200).json(employee);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
