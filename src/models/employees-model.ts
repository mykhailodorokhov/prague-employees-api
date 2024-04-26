import { FastifyInstance } from "fastify";
import { EmployeeBodyType, searchQueryType } from "../schemas/schema";

const TABLE_NAME = "employees";

export interface Employee {
  id: number;
  name: string;
  title: string;
  tribe_id: number;
}

export async function getEmployees(
  fastify: FastifyInstance,
  searchQuery: searchQueryType
): Promise<Employee[]> {
  const employeesQuery = fastify.excel
    .from(TABLE_NAME)
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe_id"
    );

  if (searchQuery.name)
    employeesQuery.whereLike("employees.name", `%${searchQuery.name}%`);
  if (searchQuery.title)
    employeesQuery.where({ "employees.title": searchQuery.title });
  if (searchQuery.tribe)
    employeesQuery.where({ "tribes.name": searchQuery.tribe });

  const employeesQueryResult = await employeesQuery.then();
  return employeesQueryResult;
}

export async function getEmployee(
  fastify: FastifyInstance,
  id: number
): Promise<Employee | null> {
  const result: Employee[] = await fastify.excel
    .from(TABLE_NAME)
    .where({ id })
    .select();

  if (result.length === 0) return null;

  return result[0];
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
