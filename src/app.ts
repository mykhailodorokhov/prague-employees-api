import Fastify from "fastify";
import routes from "./routes";

const fastify = Fastify();

fastify.register(routes);

async function main() {
  try {
    await fastify.listen({ port: 3000, host: "127.0.0.1" });
    console.log("server is running ✅");
  } catch (e) {
    console.log("error 🫡");
    console.log((e as Error).message);
  }
}

main();
