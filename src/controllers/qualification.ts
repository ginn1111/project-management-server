import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import { IQualificationRequest } from "../@types/request";
import { generateId } from "../utils/generate-id";

const PREFIX_KEY = "QUAL";
const prismaClient = new PrismaClient();

export const getList = async (req: IQualificationRequest, res: Response) => {
	const { id } = req.params;
	const qualifications = await prismaClient.qualificationsOfEmployee.findMany({
		where: {
			AND: [
				{
					idEmployee: id,
				},
			],
		},
		include: {
			qualification: {
				include: {
					rolesOfEmployee: {
						include: {
							departmentOfEmp: {
								include: {
									department: true,
								},
							},
						},
					},
				},
			},
		},
	});

	return res.status(200).json(qualifications);
};

export const update = async (req: IQualificationRequest, res: Response) => {
	const { id } = req.params;

	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}
		const qualification = await prismaClient.qualification.findUnique({
			where: {
				id,
			},
			include: {
				qualificationsOfEmployee: true,
			},
		});

		const { date, note, ...restBody } = req.body;
		console.log(qualification?.qualificationsOfEmployee);

		if (!isEmpty(qualification)) {
			const { qualificationsOfEmployee, ...rest } = qualification;
			const _updatedQualification = Object.assign({}, rest, restBody);

			const updatedQualification = await prismaClient.qualification.update({
				data: {
					..._updatedQualification,
				},
				where: {
					id,
				},
			});

			const _updatedRelation = Object.assign(
				qualification.qualificationsOfEmployee[0],
				{
					...(date ? { date: new Date(date).toISOString(), note } : { note }),
				},
			);
			const updatedRelation =
				await prismaClient.qualificationsOfEmployee.update({
					data: _updatedRelation,
					where: {
						id: qualification.qualificationsOfEmployee[0].id,
					},
				});
			return res.status(200).json({ updatedQualification, updatedRelation });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const addNew = async (
	req: IQualificationRequest<{ idEmployee: string }>,
	res: Response,
) => {
	const { id: _, date, name, url, idEmployee, ...restBody } = req.body ?? {};
	try {
		if (!name || !idEmployee) {
			return res.status(422).json("invalid parameters");
		}
		const qualification = await prismaClient.qualification.create({
			data: {
				name: name,
				id: generateId(PREFIX_KEY),
				url,
				qualificationsOfEmployee: {
					create: {
						id: generateId("QAEM"),
						idEmployee,
						date: date ? new Date(date).toISOString() : null,
						...restBody,
					},
				},
			},
		});
		return res.status(200).json(qualification);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const getDetail = async (req: IQualificationRequest, res: Response) => {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(422).json("invalid parameters");
		}
		const qualification = await prismaClient.qualification.findFirst({
			where: {
				id,
			},
			include: {
				qualificationsOfEmployee: true,
				rolesOfEmployee: true,
			},
		});

		return res.status(200).json(qualification);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const addRole = async (req: IQualificationRequest, res: Response) => {
	const { idEmp, id } = req.params;
	const { note, roleName } = req.body ?? {};
	try {
		if (!idEmp || !id || !roleName)
			return res.status(422).json("invalid parameters");

		const departmentOfEmp = await prismaClient.employeesOfDepartment.findFirst({
			where: {
				idEmployee: idEmp,
				endDate: null,
			},
		});

		if (isEmpty(departmentOfEmp))
			return res.status(409).json("Nhân viên chưa tham gia phòng ban!");

		// if the qualification is exist a role is the same department
		// -> this will auto set endDate to the startDate of new role!
		const existRoleNotEnd = await prismaClient.rolesOfEmployee.findFirst({
			where: {
				AND: [
					{
						idDepartmentEmp: departmentOfEmp.id,
					},
					{
						idQualification: id,
					},
					{
						endDate: null,
					},
				],
			},
		});

		// update the endDate of exist role in the same department and qualification
		if (!isEmpty(existRoleNotEnd)) {
			await prismaClient.rolesOfEmployee.update({
				data: {
					endDate: new Date().toISOString(),
				},
				where: {
					id: existRoleNotEnd.id,
				},
			});
		}

		const newRole = await prismaClient.rolesOfEmployee.create({
			data: {
				id: generateId("ROLE"),
				idDepartmentEmp: departmentOfEmp.id,
				idQualification: id,
				startDate: new Date().toISOString(),
				note,
				roleName,
			},
		});

		return res.json(newRole);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const endRole = async (req: IQualificationRequest, res: Response) => {};
