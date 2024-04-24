import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees-model";
import { IdParamsType, idParamsSchema } from "../schemas/employee-schema";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "DELETE",
    url: "/api/employees/:id",
    schema: {
      params: idParamsSchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;

      const affectedId = employeesModel.deleteEmployee(params.id);
      reply.code(200).send({ affected_id: affectedId });
    },
  };
}
