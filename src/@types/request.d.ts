import {
	Account,
	AccountEmployee,
	Certificate,
	CertificationsOfEmployee,
	Customer,
	Department,
	Employee,
	EmployeesOfDepartment,
	EmployeesOfProject,
	Ingredient,
	ManageProject,
	PermissionWork,
	PermissionWorksOfEmployee,
	Position,
	PositionsOfEmployee,
	Project,
	ProjectResource,
	ProposeProject,
	ProposeResource,
	Qualification,
	QualificationsOfEmployee,
	Resource,
	ResourceOfTask,
	ResourceType,
	ReviewingProposeProject,
	ReviewingProposeResource,
	Supply,
	TasksOfWork,
	Tool,
	WorksOfEmployee,
	WorksOfProject,
} from "@prisma/client";
import { Request } from "express";

interface IEmployeeRequest extends Request {
	query?: QueryParams & { idDepartment?: string; code?: string };
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
	query?: QueryParams & { idProject?: string };
	body?: Partial<Department & EmployeesOfDepartment & T>;
}

interface IPositionRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Position & PositionsOfEmployee>;
}

interface IAccountRequest<T = any> extends Request {
	query?: QueryParams & { idDepartment?: string };
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
		idEmployee?: string;
		isDone?: "true" | "false";
	};
	body?: Partial<Project & T>;
}
interface IResourceRequest<T = any> extends Request {
	query?: QueryParams & { idResourceType?: string; idProject?: string };
	body?: Partial<Resource>;
}

interface IProposeProject<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<ProposeProject & T>;
}

interface IReviewProposeProject<T = any> extends Request {
	query?: QueryParams & { idProject?: string; idDepartment?: string };
	body?: Partial<ReviewingProposeProject & T>;
}
interface IAuthenticationRequest<T = any> extends Request {
	body?: Partial<Account & T>;
}
interface IResourceTypeRequest<T = any> extends Request {
	body?: Partial<ResourceType & T>;
}

interface IWorkProjectRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<WorksOfProject & T>;
}

interface IEmployeeProjectRequest<T = any> extends Request {
	query?: QueryParams & { idDepartment?: string };
	body?: Partial<EmployeesOfProject & T>;
}
interface IProjectResourceRequest<T = any> extends Request {
	query?: QueryParams & { idResourceType?: string };
	body?: Partial<ProjectResource & T>;
}
interface IProposeReviewRSProject<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<ReviewingProposeResource & T>;
}
interface IProposeResourceRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<ProposeResource & T>;
}
interface IWorkOfEmpRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<WorksOfEmployee & T>;
}

interface ITaskOfWorkRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<TasksOfWork & T>;
}

interface IResourceOfTaskRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<ResourceOfTask & T>;
}

interface IPermissionOfWorkRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<PermissionWorksOfEmployee & T>;
}

interface IEvaluationWorkRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<IEvaluationWork & T>;
}

interface IManageProjectRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<ManageProject & T>;
}

interface IStatisticRequest<T = any> extends Request {
	query?: QueryParams & {
		startDate?: string;
		finishDate?: string;
		idProject?: string;
		isExpired?: "true" | "false";
		idEmployee?: string;
		idEmpProject?: string;
		idDepartment?: string;
	};
}

interface IReportRequest<T = any> extends Request {
	query?: QueryParams & { idProject?: string };
	body?: Partial<Report & T>;
}

interface ICustomerRequest<T = any> extends Request {
	query?: QueryParams;
	body?: Partial<Customer & T>;
}
