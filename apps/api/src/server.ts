import compress from "@fastify/compress";
import fastifyCors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";

import { appRouter, createContext } from "@abuse-sleuth/trpc";

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
fastifyApp.register(helmet, {
    crossOriginResourcePolicy: {
        policy: "same-site",
    },
});
fastifyApp.register(compress);

fastifyApp.register(fastifyCors, {
    origin: (origin, cb) => {
        const url = new URL(origin);
        if (url.hostname === "localhost") {
            //  Request from localhost will pass
            cb(null, true);
            return;
        }
        // Generate an error on other origins, disabling access
        cb(new Error("Not allowed"), false);
    },
});

fastifyApp.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
});

fastifyApp.get("/", {}, (req, res) => {
    res.send(Math.random() * 100);
});

export { fastifyApp };
