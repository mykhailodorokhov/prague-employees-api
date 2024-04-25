import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees-model";
import { EmployeeBodyType, employeeBodySchema } from "../schemas/schema";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "POST",
    url: "/api/employees",
    schema: {
      body: employeeBodySchema,
    },
    handler: async (request, reply) => {
      const employee = request.body as EmployeeBodyType;

      const newEmployeeId = await employeesModel.createEmployee(
        fastify,
        employee
      );
      reply.code(200).send(newEmployeeId);
    },
  };
}
