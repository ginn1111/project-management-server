import { Employee } from "@prisma/client";
import { Request } from "express";

interface IEmployeeRequest extends Request {
	query?: QueryParams;
	body?: Partial<Employee>;
}
