import { FastifyInstance } from "fastify";
import { EmployeeBodyType, searchQueryType } from "../schemas/schema";

const TABLE_NAME = "employees";

interface EmployeeDTO {
  id: number;
  name: string;
  title: string;
  tribe: {
    id: number;
    name: string;
    department: string;
  };
}

interface EmployeeQueryResult {
  id: number;
  name: string;
  title: string;
  "tribe.id": number;
  "tribe.name": string;
  "tribe.department": string;
}

const mapToEmployeeDTO = (employee: EmployeeQueryResult): EmployeeDTO => {
  const employeeDTO: EmployeeDTO = {
    id: employee.id,
    name: employee.name,
    title: employee.title,
    tribe: {
      id: employee["tribe.id"],
      name: employee["tribe.name"],
      department: employee["tribe.department"],
    },
  };

  return employeeDTO;
};

export async function getEmployees(
  fastify: FastifyInstance,
  searchQuery: searchQueryType
): Promise<EmployeeDTO[]> {
  const employeesQuery = fastify.excel
    .from(TABLE_NAME)
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    );

  if (searchQuery.name)
    employeesQuery.whereLike("employees.name", `%${searchQuery.name}%`);
  if (searchQuery.title)
    employeesQuery.where({ "employees.title": searchQuery.title });
  if (searchQuery.tribe)
    employeesQuery.where({ "tribes.name": searchQuery.tribe });

  const employeesQueryResult = await employeesQuery.then();

  const employees: EmployeeDTO[] = employeesQueryResult.map(mapToEmployeeDTO);
  return employees;
}

export async function getEmployee(
  fastify: FastifyInstance,
  id: number
): Promise<EmployeeDTO | null> {
  const employeeQueryResult = await fastify.excel
    .from(TABLE_NAME)
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    )
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .where({ "employees.id": id })
    .first();

  if (!employeeQueryResult) return null;

  return mapToEmployeeDTO(employeeQueryResult);
}

export async function createEmployee(
  fastify: FastifyInstance,
  employee: EmployeeBodyType
): Promise<number> {
  return await fastify.excel.from(TABLE_NAME).insert(employee);
}

export async function deleteEmployee(
  fastify: FastifyInstance,
  id: number
): Promise<number> {
  return await fastify.excel.from(TABLE_NAME).where({ id }).del();
}
