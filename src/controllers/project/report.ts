import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { IReportRequest } from "../../@types/request";
import { get, isEmpty, pick } from "lodash";
import { generateId } from "../../utils/generate-id";

const prismaClient = new PrismaClient();

export const getList = async (req: IReportRequest, res: Response) => {
	try {
		const { id: idProject } = req.params;
		const { page, limit } = req.query ?? {};
		const _page = !isNaN(page as unknown as number) ? parseInt(page!) : 0;
		const _limit = !isNaN(limit as any) ? parseInt(limit!) : 10;
		if (!idProject) return res.status(422).json("invalid parameter");

		const condition = {
			empProject: {
				idProject,
			},
		};

		const totalItems = await prismaClient.report.count({
			where: {
				...condition,
			},
		});

		const reportsOfProject = await prismaClient.report.findMany({
			...(!isNaN(_page) && !isNaN(_limit)
				? { take: _limit, skip: _page * _limit }
				: {}),
			where: {
				...condition,
			},
			include: {
				empProject: {
					include: {
						proposeProject: {
							include: {
								employeesOfDepartment: {
									include: {
										employee: true,
										department: true,
									},
								},
							},
						},
					},
				},
			},
			orderBy: {
				createdDate: "desc",
			},
		});

		return res.json({
			reports: reportsOfProject?.map((report) => ({
				...pick(report, ["content", "id", "createdDate"]),
				employee: get(
					report,
					"empProject.proposeProject.employeesOfDepartment.employee",
				),
				department: get(
					report,
					"empProject.proposeProject.employeesOfDepartment.department",
				),
			})),
			totalItems,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
export const addNew = async (req: IReportRequest, res: Response) => {
	try {
		const { id: idProject } = req.params;
		const { content } = req.body ?? {};
		if (!idProject || !content)
			return res.status(422).json("invalid parameter");

		if (!isEmpty(res.locals.headOrCreator))
			return res.status(409).json("Phụ trách dự án không thể tạo báo cáo");

		const createdReport = await prismaClient.report.create({
			data: {
				id: generateId("REPO"),
				idEmpProject: res.locals.empOfProject.id,
				content,
				createdDate: new Date().toISOString(),
			},
		});

		return res.json(createdReport);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Server error");
	}
};
