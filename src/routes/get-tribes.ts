import { FastifyInstance, RouteOptions } from "fastify";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes",
    handler: async (request, reply) => {
      reply.code(501).send({ message: "Not implemented" });
    },
  };
}
