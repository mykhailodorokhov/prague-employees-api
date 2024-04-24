import { FastifyInstance } from "fastify";
import { EmployeeBodyType } from "../schemas/employee-schema";

const TABLE_NAME = "employees";

export interface Employee {
  id: number;
  name: string;
  title: string;
  tribe_id: number;
}

export async function getEmployees(
  fastify: FastifyInstance
): Promise<Employee[]> {
  return await fastify.excel.from(TABLE_NAME).select();
}

export async function getEmployee(
  fastify: FastifyInstance,
  id: number
): Promise<Employee | null> {
  const result: Employee[] = await fastify.excel
    .from(TABLE_NAME)
    .where({ id })
    .select();

  if (result.length === 0) {
    return null;
  }

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
