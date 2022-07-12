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
        level: "debug",
        transport:
            process.env.NODE_ENV !== "production"
                ? {
                      target: "pino-pretty",
                      options: {
                          translateTime: "HH:MM:ss",
                          ignore: "pid,hostname",
                          colorize: true,
                      },
                  }
                : undefined,
    },
});

// Register Global Plugins
fastifyApplication.register(helmet);
fastifyApplication.register(cookies, {
    secret: "CHANGE_ME", //TODO: Make a ENV var
});
fastifyApplication.register(compress);

fastifyApplication.register(fastifyCors, {
    credentials: true,
    origin: (origin, cb) => {
        if (process.env.NODE_ENV === "production") {
            // TODO: Make this better for production
            const url = new URL(origin);
            if (url.hostname === "localhost") {
                fastifyApplication.log.debug(
                    "CORS Passing as of localhost hostname"
                );
                //  Request from localhost will pass
                cb(null, true);
                return;
            }
            // Generate an error on other origins, disabling access
            cb(new Error("Not allowed"), false);
        } else {
            fastifyApplication.log.debug("CORS Passing as DEV environment");
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
