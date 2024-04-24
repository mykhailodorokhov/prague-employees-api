import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees-model";
import { IdParamsType, idParamsSchema } from "../schemas/employee-schema";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees/:id",
    schema: {
      params: idParamsSchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;

      const employee = await employeesModel.getEmployee(fastify, params.id);
      if (!employee) {
        reply.code(404).send({ message: "No employee found" });
      } else {
        reply.code(200).send(employee);
      }
    },
  };
}
