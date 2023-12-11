import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import { IPositionRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";
import { getDepartment } from "../services/get-department";
import { Role } from "../constants/general";
import { getHeadOfDepartment } from "../services/get-head-department";
import { getPositionOfEmp } from "../services/get-position";

const PREFIX_KEY = "POST";
const prismaClient = new PrismaClient();

export const getListByEmployee = async (
	req: IPositionRequest,
	res: Response,
) => {
	const { id } = req.params;

	try {
		if (!id) return res.status(422).json("invalid parameters");
		const positionsOfEmployee = await prismaClient.positionsOfEmployee.findMany(
			{
				where: {
					idEmployee: id,
				},
				include: {
					position: true,
				},
				orderBy: {
					startDate: "desc",
				},
			},
		);
		return res.json(positionsOfEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const getList = async (req: IPositionRequest, res: Response) => {
	let { page, limit, search = "" } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;

	try {
		const totalItems = await prismaClient.position.count({
			where: {
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

		const positions = await prismaClient.position.findMany({
			take: _limit,
			skip: _page * _limit,
			where: {
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

		return res.status(200).json({ positions, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const update = async (req: IPositionRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}

		const position = await prismaClient.position.findUnique({
			where: {
				id,
			},
		});

		const existPositionCode = await prismaClient.position.findFirst({
			where: {
				code: position?.code,
				isActive: true,
			},
		});

		if (!isEmpty(existPositionCode))
			return res.status(409).json("Tên chức vụ đã tồn tại");

		if (isEmpty(position)) return res.status(422).json("invalid parameters");

		const { id: _, ...rest } = position;
		const _updatedPosition = Object.assign(rest, req.body);

		const updatedPosition = await prismaClient.position.update({
			data: {
				..._updatedPosition,
			},
			where: {
				id,
			},
		});

		return res.json(updatedPosition);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const updateByEmployee = async (
	req: IPositionRequest,
	res: Response,
) => {
	const { idRelation } = req.params;
	const { startDate, endDate, ...restBody } = req.body ?? {};

	try {
		if (!idRelation) return res.status(422).json("invalid parameters");

		const positionOfEmployee = await prismaClient.positionsOfEmployee.findFirst(
			{
				where: {
					id: idRelation,
				},
			},
		);

		if (isEmpty(positionOfEmployee))
			return res.status(422).json("invalid parameters");

		const { id, idEmployee, idPosition, ...rest } = positionOfEmployee;
		const _updatedPositionOfEmployee = Object.assign(rest, {
			startDate: startDate ? new Date(startDate).toISOString() : rest.startDate,
			endDate: endDate ? new Date(endDate).toISOString() : rest.endDate,
			...restBody,
		});

		const updatedPositionByEmployee =
			await prismaClient.positionsOfEmployee.update({
				data: _updatedPositionOfEmployee,
				where: {
					id: idRelation,
				},
			});
		return res.json(updatedPositionByEmployee);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const addNew = async (req: IPositionRequest, res: Response) => {
	const { id, name, code, ...restBody } = req.body ?? {};
	try {
		if (!name || !code) return res.status(422).json("invalid parameter");

		const existPositionCode = await prismaClient.position.findFirst({
			where: {
				code,
				isActive: true,
			},
		});

		if (!isEmpty(existPositionCode))
			return res.status(409).json("Tên chức vụ đã tồn tại");

		const position = await prismaClient.position.create({
			data: {
				id: generateId(PREFIX_KEY),
				name,
				code,
				...restBody,
			},
		});
		return res.status(200).json(position);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const addToEmployee = async (
	req: IPositionRequest<{ idEmp: string }>,
	res: Response,
) => {
	const { id, idEmp } = req.params;
	const bodyData = req.body ?? {};

	try {
		if (!id || !idEmp) return res.status(422).json("invalid parameters");

		const currentPositionOfEmp = await getPositionOfEmp(idEmp);

		if (id === currentPositionOfEmp?.position?.id)
			return res.status(409).json("Chức vụ mới không thể là chức vụ hiện tại");

		// check if now position is head of department
		const newPosition = await prismaClient.position.findFirst({
			where: { id },
		});
		const departmentOfEmp = await getDepartment(idEmp);

		if (newPosition?.code === Role.TRUONG_PHONG) {
			if (isEmpty(departmentOfEmp) || !departmentOfEmp.idDepartment) {
				return res
					.status(409)
					.json(
						"Bạn phải là thành viên của phòng ban trước khi làm trưởng phòng!",
					);
			}
			const headOfDepartment = await getHeadOfDepartment(
				departmentOfEmp.idDepartment,
			);

			if (!isEmpty(headOfDepartment)) {
				return res.status(409).json("Mỗi phòng ban chỉ có một trưởng phòng!");
			}
		}

		await prismaClient.$transaction(async (tx) => {
			// if emp have old position
			if (!isEmpty(currentPositionOfEmp)) {
				// mark old is end
				await tx.positionsOfEmployee.update({
					where: {
						id: currentPositionOfEmp?.id,
					},
					data: {
						endDate: new Date().toISOString(),
					},
				});
				if (currentPositionOfEmp.position?.code === Role.TRUONG_PHONG) {
					// if old position is TRUONG_PHONG update idHead of rest department
					await tx.employeesOfDepartment.updateMany({
						where: {
							idDepartment: departmentOfEmp?.idDepartment,
							endDate: null,
						},
						data: {
							idHead: null,
						},
					});
				}
			}

			// create new positionsOfEmployee record
			const positionOfEmployee = await tx.positionsOfEmployee.create({
				data: {
					id: generateId("POEM"),
					idPosition: id,
					idEmployee: idEmp,
					startDate: new Date().toISOString(),
					...bodyData,
				},
			});

			// update head of department for rest emp
			if (newPosition?.code === Role.TRUONG_PHONG && departmentOfEmp) {
				// update idHead of employee
				await tx.employeesOfDepartment.updateMany({
					where: {
						id: {
							not: departmentOfEmp.id,
						},
						idDepartment: departmentOfEmp?.idDepartment,
						endDate: null,
					},
					data: {
						idHead: departmentOfEmp.id,
					},
				});

				//if it is a employee of old department will update it is head
				await tx.employeesOfDepartment.update({
					where: {
						id: departmentOfEmp.id,
					},
					data: {
						idHead: null,
					},
				});
			}

			return res.json(positionOfEmployee);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const getDetail = async (req: IPositionRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422).json("invalid parameters");
		}
		const position = await prismaClient.position.findFirst({
			where: {
				id,
			},
			include: {
				positionsOfEmployee: true,
			},
		});

		return res.status(200).json(position);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const remove = async (req: IPositionRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(422).json("invalid parameters");

		const deletedPosition = await prismaClient.position.update({
			data: {
				isActive: false,
			},
			where: {
				id,
			},
		});
		return res.json(deletedPosition);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
