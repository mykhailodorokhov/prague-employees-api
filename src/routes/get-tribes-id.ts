import { FastifyInstance, RouteOptions } from "fastify";
import * as tribesModel from "../models/tribes-model";
import { IdParamsType, idParamsSchema } from "../schemas/schema";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes/:id",
    schema: {
      params: idParamsSchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;

      const tribe = await tribesModel.getTribe(fastify, params.id);
      if (!tribe) {
        reply.code(404).send({ message: "No tribe found" });
      } else {
        reply.code(200).send(tribe);
      }
    },
  };
}
