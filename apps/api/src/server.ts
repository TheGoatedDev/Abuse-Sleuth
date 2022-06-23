import compress from "@fastify/compress";
import helmet from "@fastify/helmet";
import Fastify from "fastify";

const fastifyApp = Fastify({
    logger: {
        transport:
            process.env.NODE_ENV !== "production"
                ? {
                      target: "pino-pretty",
                      options: {
                          translateTime: "HH:MM:ss Z",
                          ignore: "pid,hostname",
                      },
                  }
                : undefined,
    },
});

// Register Global Plugins
fastifyApp.register(helmet);
fastifyApp.register(compress);

fastifyApp.get("/", {}, (req, res) => {
    res.send(Math.random() * 100);
});

export { fastifyApp };
