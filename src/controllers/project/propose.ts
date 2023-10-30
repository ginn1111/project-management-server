import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { isEmpty } from "lodash";
import {
	IProjectResourceRequest,
	IProposeProject,
	IProposeResourceRequest,
	IReviewProposeProject,
} from "../../@types/request";
import { StatePropose } from "../../constants/review";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

export const propose = async (
	req: IProposeProject<{ idEmployee: string }>,
	res: Response,
) => {
	const { idEmployee, idProject, content } = req.body ?? {};

	try {
		if (!idEmployee || !idProject)
			return res.status(422).json("invalid parameter");

		const departmentOfEmployee =
			await prismaClient.employeesOfDepartment.findFirst({
				where: {
					idEmployee,
					endDate: null,
				},
			});

		// employee do not exist in any department
		if (isEmpty(departmentOfEmployee)) {
			return res
				.status(409)
				.json("Bạn cần phải tham gia phòng ban trước khi tham gia vào dự án!");
		}

		// employee is exist on project
		const employeeInProject = await prismaClient.employeesOfProject.findMany({
			where: {
				endDate: null,
				idProject,
				proposeProject: {
					idDeEmp: departmentOfEmployee.id,
				},
			},
		});

		if (employeeInProject.length) {
			return res.status(409).json("Bạn đã là thành viên của dự án");
		}

		// department of employee do not exist in project
		const departmentsOfProj = await prismaClient.departmentOfProject.findMany({
			include: {
				department: true,
			},
			where: {
				idProject,
			},
		});

		const isExistDepartmentInProj = departmentsOfProj?.some(
			({ idDepartment }) => departmentOfEmployee.idDepartment === idDepartment,
		);

		if (!isExistDepartmentInProj) {
			return res.status(422).json("Dự án này không bao gồm phòng ban của bạn!");
		}

		const stateProposes = await prismaClient.statePropose.findMany();

		if (!stateProposes?.length) {
			return res
				.status(500)
				.json("Có lỗi xảy ra, không tìm thấy trạng thái của đề xuất");
		}

		const pendingState = stateProposes.find(
			(state) => state.name === StatePropose.Pending,
		);

		// if employee has a pending propose
		const proposes = await prismaClient.reviewingProposeProject.findMany({
			where: {
				proposeProject: {
					employeesOfDepartment: {
						id: departmentOfEmployee.id,
					},
					idProject,
				},
				statePropose: {
					name: StatePropose.Pending,
				},
			},
		});

		if (proposes.length) {
			return res.status(409).json("Đang có đề xuất đang chờ duyệt");
		}

		// if employee exist in project and endDate === null
		const query = await prismaClient.$queryRaw`
			declare @RC int;
			EXEC @RC = sp_ton_tai_nv_du_an '${idProject}','${idEmployee}';
			select isExist = @RC
		`;

		if ((query as any)[0].isExist) {
			return res.status(409).json("Nhân viên đã tồn tại trong dự án");
		}

		const createdPropose = await prismaClient.proposeProject.create({
			data: {
				id: generateId("PROP"),
				idDeEmp: departmentOfEmployee.id,
				idProject,
				createdDate: new Date().toISOString(),
				content,
				reviewingProposeProject: {
					create: {
						id: generateId("REVW"),
						idState: pendingState?.id,
					},
				},
			},
		});

		return res.json(createdPropose);
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const getDetail = async (req: IReviewProposeProject, res: Response) => {
	const { id } = req.params;

	try {
		if (!id) return res.status(422).json("invalid parameters");
		const reviewPropose = await prismaClient.reviewingProposeProject.findFirst({
			where: {
				id,
			},
			include: {
				proposeProject: true,
				statePropose: true,
			},
		});

		return res.json(reviewPropose);
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const review = async (req: IReviewProposeProject, res: Response) => {
	const { id } = req.params;
	const { stateName, note } = req?.body ?? {};

	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}

		const state = await prismaClient.statePropose.findFirst({
			where: {
				name: stateName,
			},
		});

		if (isEmpty(state)) return res.status(409).json("Trạng thái không hợp lệ");

		const reviewState = await prismaClient.reviewingProposeProject.findFirst({
			include: {
				statePropose: true,
			},
			where: {
				id,
			},
		});

		if (reviewState?.statePropose?.name !== StatePropose.Pending) {
			return res.status(409).json("Đề xuất này đã đuyệt!");
		}

		await prismaClient.$transaction(async (tx) => {
			// update state of review propose
			const updatedReview = await tx.reviewingProposeProject.update({
				where: { id },
				data: {
					idState: state.id,
					note,
					reviewingDate: new Date().toISOString(),
				},
				include: {
					proposeProject: true,
				},
			});

			// if state is approve, add employee to project
			if (state?.name === StatePropose.Approve) {
				await tx.employeesOfProject.create({
					data: {
						id: generateId("EMPR"),
						idProject: updatedReview.proposeProject?.idProject,
						idProposeProject: updatedReview.idProposeProject,
						startDate: new Date().toISOString(),
					},
				});
			}
		});

		return res.json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const getList = async (req: IReviewProposeProject, res: Response) => {
	const { page, limit, idProject } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.reviewingProposeProject.count({
			where: {
				proposeProject: {
					project: {
						id: idProject || undefined,
					},
				},
			},
		});

		const reviewProposes = await prismaClient.reviewingProposeProject.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			include: {
				statePropose: true,
				proposeProject: {
					include: {
						employeesOfDepartment: {
							include: {
								employee: true,
							},
						},
						project: true,
					},
				},
			},
			where: {
				proposeProject: {
					project: {
						id: idProject || undefined,
					},
				},
			},
			orderBy: {
				proposeProject: {
					createdDate: "desc",
				},
			},
		});

		return res.json({ reviewProposes, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

// propose resource
export const getListProposeResource = async (
	req: IProjectResourceRequest,
	res: Response,
) => {
	const { id } = req.params;
	const { page, limit } = req.query ?? {};
	const _page = !isNaN(page as unknown as number) ? parseInt(page!) : NaN;
	const _limit = !isNaN(limit as any) ? parseInt(limit!) : NaN;

	try {
		const totalItems = await prismaClient.reviewingProposeResource.count({
			where: {
				proposeResource: {
					employeesOfProject: {
						idProject: id,
					},
				},
			},
		});

		const proposeResource =
			await prismaClient.reviewingProposeResource.findMany({
				...(!isNaN(_page) && !isNaN(_limit)
					? { take: _limit, skip: _page * _limit }
					: {}),
				where: {
					proposeResource: {
						employeesOfProject: {
							idProject: id,
						},
					},
				},
				include: {
					state: true,
					proposeResource: {
						include: {
							employeesOfProject: {
								include: {
									proposeProject: {
										include: {
											employeesOfDepartment: {
												include: {
													employee: true,
												},
											},
										},
									},
								},
							},
						},
					},
				},
			});
		return res.json({ proposeResource, totalItems });
	} catch (error) {
		console.log(error);
		return res.status(500).json((error as Error).message ?? "Server error");
	}
};

export const addProposeResource = async (
	req: IProposeResourceRequest<{ resource: { id: string; amount: number }[] }>,
	res: Response,
) => {
	try {
		const { idEmpProject } = req.params;
		const { resource, description } = req.body ?? {};

		if (!idEmpProject || !resource?.length)
			return res.status(422).json("invalid parameter");

		const resourceIndex = resource.reduce(
			(acc, res) => {
				acc[res.id] = res.amount;
				return acc;
			},
			{} as Record<string, number>,
		);

		const stateProposes = await prismaClient.statePropose.findMany();

		if (!stateProposes?.length) {
			return res
				.status(500)
				.json("Có lỗi xảy ra, không tìm thấy trạng thái của đề xuất");
		}

		const pendingState = stateProposes.find(
			(state) => state.name === StatePropose.Pending,
		);

		const resourceFind = await Promise.all(
			resource.map(({ id }) => {
				return prismaClient.resource.findFirst({ where: { id } });
			}),
		);

		await prismaClient.$transaction(async (tx) => {
			// create new review propose with state is pending
			const newPropose = await tx.proposeResource.create({
				data: {
					id: generateId("PRPR"),
					description,
					idEmpProject,
					reviewingProposeResource: {
						create: {
							id: generateId("RVPR"),
							idState: pendingState?.id!,
						},
					},
				},
			});

			// add many resource in resource propose
			await tx.resourcesPropose.createMany({
				data: resource.map(({ id: idResource, amount }) => {
					return {
						id: generateId("REPR"),
						idResource,
						idProposeResource: newPropose.id,
						amount,
					};
				}),
			});

			// subtract amount of resource in warehouse
			await Promise.all(
				resourceFind.map((r) => {
					return tx.resource.update({
						where: {
							id: r!.id,
						},
						data: {
							amount: r!.amount - resourceIndex[r!.id],
						},
					});
				}),
			);
		});
		return res.json("Tạo đề xuất thành công!");
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};

export const reviewProposeResource = async (
	req: IProjectResourceRequest,
	res: Response,
) => {
	try {
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
