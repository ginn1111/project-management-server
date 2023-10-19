import {
	Certificate,
	Department,
	Employee,
	Qualification,
} from "@prisma/client";
import { Request } from "express";

interface IEmployeeRequest extends Request {
	query?: QueryParams;
	body?: Partial<Employee>;
}

interface ICertificateRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Certificate> & T;
}

interface IQualificationRequest extends Request {
	query?: QueryParams;
	body?: Partial<Qualification>;
}
interface IDepartmentRequest extends Request {
	query?: QueryParams;
	body?: Partial<Department>;
}
