import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees-model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees",
    handler: async (request, reply) => {
      const employees = await employeesModel.getEmployees(fastify);
      reply.code(200).send(employees);
    },
  };
}
