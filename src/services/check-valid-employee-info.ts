import { Employee, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkValidEmployeeInfo = async (employeeInfo: Employee) => {
	if (employeeInfo.email) {
		const isExist = await prisma.employee.findFirst({
			where: {
				email: employeeInfo.email,
				isActive: true,
			},
		});

		if (isExist) {
			const itSelf = isExist.id === employeeInfo.id;
			if (!itSelf) {
				return "Email đã được sử dụng bởi nhân viên khác";
			}
		}
	}

	if (employeeInfo.phone) {
		const isExist = await prisma.employee.findFirst({
			where: {
				phone: employeeInfo.phone,
				isActive: true,
			},
		});

		console.log(isExist, employeeInfo);
		if (isExist) {
			const itSelf = isExist.id === employeeInfo.id;
			if (!itSelf) return "Số điện thoại đã được sử dụng bởi nhân viên khác";
		}
	}

	if (employeeInfo.identifyNumber) {
		const isExist = await prisma.employee.findFirst({
			where: {
				identifyNumber: employeeInfo.identifyNumber,
				isActive: true,
			},
		});

		if (isExist) {
			const itSelf = isExist.id === employeeInfo.id;
			if (!itSelf) {
				return "CMND/CCCC đã được sử dụng bởi nhân viên khác";
			}
		}
	}

	return;
};
