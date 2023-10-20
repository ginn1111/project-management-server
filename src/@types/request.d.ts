import {
	Certificate,
	CertificationsOfEmployee,
	Department,
	Employee,
	EmployeesOfDepartment,
	Position,
	PositionsOfEmployee,
	Qualification,
	QualificationsOfEmployee,
} from "@prisma/client";
import { Request } from "express";

interface IEmployeeRequest extends Request {
	query?: QueryParams;
	body?: Partial<Employee>;
}

interface ICertificateRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Certificate & CertificationsOfEmployee> & T;
}

interface IQualificationRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Qualification & QualificationsOfEmployee> & any;
}
interface IDepartmentRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Department & EmployeesOfDepartment>;
}

interface IPositionRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Position & PositionsOfEmployee>;
}
