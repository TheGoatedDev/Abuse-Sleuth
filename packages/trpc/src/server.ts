import compress from "@fastify/compress";
import cookies from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";

import { createContext } from "./context";
import { appRouter } from "./routers";

const fastifyApplication = Fastify({
    maxParamLength: 50000,
    logger: {
        transport:
            process.env.NODE_ENV !== "production"
                ? {
                      target: "pino-pretty",
                      options: {
                          translateTime: "HH:MM:ss Z",
                          ignore: "pid,hostname,time",
                          colorize: true,
                      },
                  }
                : undefined,
    },
});

// Register Global Plugins
fastifyApplication.register(helmet);
fastifyApplication.register(cookies, {
    secret: "CHANGE_ME",
});
fastifyApplication.register(compress);

fastifyApplication.register(fastifyCors, {
    credentials: true,
    origin: (origin, cb) => {
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

//fastifyApp.register(ws);
fastifyApplication.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    //useWSS: true,
    trpcOptions: { router: appRouter, createContext },
});

export { fastifyApplication as fastifyApp };
