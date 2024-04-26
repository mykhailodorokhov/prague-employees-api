import { FastifyInstance } from "fastify";
import * as employeesModel from "../models/employees-model";
import * as tribesModel from "../models/tribes-model";

export async function getReport(fastify: FastifyInstance) {
  const employees = await employeesModel.getEmployees(fastify, {});
  const tribes = await tribesModel.getTribes(fastify);

  const report = tribes.map((tribe) => {
    const employeesList = employees.filter((x) => x.tribe_id === tribe.id);
    return {
      ...tribe,
      employees: employeesList,
    };
  });

  return report;
}
