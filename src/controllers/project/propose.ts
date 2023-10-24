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
		// department of employee do not exist in project
		const departmentsOfProj = await prismaClient.departmentOfProject.findMany({
			include: {
				department: true,
			},
			where: {
				idProject,
			},
		});

		if (!departmentsOfProj?.length) {
			return res.status(409).json("Dự án không tồn tại!");
		}

		const isExistDepartmentInProj = departmentsOfProj.some(
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
	const { idState, note } = req?.body ?? {};

	try {
		if (!id || isEmpty(req.body)) {
			return res.status(422).json("invalid parameters");
		}

		const state = await prismaClient.statePropose.findFirst({
			where: { id: idState },
		});

		if (state?.name !== StatePropose.Pending) {
			return res.status(409).json("Đề xuất này đã đuyệt!");
		}

		await prismaClient.$transaction(async (tx) => {
			const updatedReview = await tx.reviewingProposeProject.update({
				where: { id },
				data: {
					idState,
					note,
					reviewingDate: new Date().toISOString(),
				},
				include: {
					proposeProject: true,
				},
			});

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
