import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDB = async () => {
	try {
		await prisma.$connect();
		console.log("DB connected");
	} catch (error) {
		console.log("DB connected error");
		console.log((error as Error).message);
		process.exit(1);
	}
};

export default connectDB;
