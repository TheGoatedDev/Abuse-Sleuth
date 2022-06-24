import compress from "@fastify/compress";
import fastifyCors from "@fastify/cors";
import helmet from "@fastify/helmet";
import ws from "@fastify/websocket";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";

import { appRouter, createContext } from "@abuse-sleuth/trpc";

const fastifyApp = Fastify({
    maxParamLength: 5000,
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

fastifyApp.register(fastifyCors, {
    origin: (origin, cb) => {
        fastifyApp.log.warn(origin);
        if (process.env.NODE_ENV === "production") {
            // TODO: Make this better for production
            const url = new URL(origin);
            if (url.hostname === "localhost") {
                //  Request from localhost will pass
                cb(null, true);
                return;
            }
            // Generate an error on other origins, disabling access
            cb(new Error("Not allowed"), false);
        } else {
            cb(null, true);
        }
    },
});

fastifyApp.register(ws);
fastifyApp.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    useWSS: true,
    trpcOptions: { router: appRouter, createContext },
});

export { fastifyApp };
