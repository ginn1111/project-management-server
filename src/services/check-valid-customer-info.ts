import { Customer, Employee, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkValidCustomerInfo = async (customerIfo: Customer) => {
	if (customerIfo.fax) {
		const isExist = await prisma.customer.findFirst({
			where: {
				fax: customerIfo.fax,
				isActive: true,
			},
		});

		if (isExist) {
			const itSelf = isExist.id === customerIfo.id;
			if (!itSelf) {
				return "Fax đã được sử dụng bởi khách hàng khác";
			}
		}
	}

	if (customerIfo.email) {
		const isExist = await prisma.customer.findFirst({
			where: {
				email: customerIfo.email,
				isActive: true,
			},
		});

		if (isExist) {
			const itSelf = isExist.id === customerIfo.id;
			if (!itSelf) {
				return "Email đã được sử dụng bởi khách hàng khác";
			}
		}
	}

	if (customerIfo.phone) {
		const isExist = await prisma.customer.findFirst({
			where: {
				phone: customerIfo.phone,
				isActive: true,
			},
		});

		console.log(isExist, customerIfo);
		if (isExist) {
			const itSelf = isExist.id === customerIfo.id;
			if (!itSelf) return "Số điện thoại đã được sử dụng bởi khách hàng khác";
		}
	}

	if (customerIfo.identityNumber) {
		const isExist = await prisma.customer.findFirst({
			where: {
				identityNumber: customerIfo.identityNumber,
				isActive: true,
			},
		});

		if (isExist) {
			const itSelf = isExist.id === customerIfo.id;
			if (!itSelf) {
				return "CMND/CCCC đã được sử dụng bởi khách hàng khác";
			}
		}
	}

	return;
};
