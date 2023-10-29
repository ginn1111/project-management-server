import { Response } from "express";
import { IProposeProject, IReviewProposeProject } from "../../@types/request";
import { PrismaClient } from "@prisma/client";
import { isEmpty } from "lodash";
import { generateId } from "../../utils/generate-id";
import { StatePropose } from "../../constants/review";

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
			(state) => state.name === "Đợi duyệt",
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
