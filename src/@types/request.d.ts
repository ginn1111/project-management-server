import {
	Account,
	AccountEmployee,
	Certificate,
	CertificationsOfEmployee,
	Department,
	Employee,
	EmployeesOfDepartment,
	Ingredient,
	Position,
	PositionsOfEmployee,
	Project,
	ProposeProject,
	Qualification,
	QualificationsOfEmployee,
	Resource,
	ResourceType,
	ReviewingProposeProject,
	Supply,
	Tool,
	ToolSupplier,
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
	body?: Partial<Department & EmployeesOfDepartment & T>;
}

interface IPositionRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Position & PositionsOfEmployee>;
}

interface IAccountRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Account & AccountEmployee & T>;
}
interface IToolRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Tool>;
}
interface IIngredientRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Ingredient>;
}
interface ISupplyRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Supply>;
}
interface IProjectRequest<T = any> extends Request {
	query?: QueryParams & {
		startDate?: string;
		finishDateET?: string;
		idDepartment?: string;
	};
	body?: Partial<Project & T>;
}
interface IResourceRequest<T = any> extends Request {
	query?: QueryParams & { idResourceType?: string };
	body?: Partial<Resource>;
}

interface IProposeProject<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<ProposeProject & T>;
}

interface IReviewProposeProject<T = any> extends Request {
	query?: QueryParams & { idProject?: string };
	body?: Partial<ReviewingProposeProject & T>;
}
interface IAuthenticationRequest<T = any> extends Request {
	body?: Partial<Account & T>;
}
interface IResourceTypeRequest<T = any> extends Request {
	body?: Partial<ResourceType & T>;
}
