import dotENV from "dotenv";
import { AddressInfo } from "net";
import path from "path";

import { fastifyApp } from "@abuse-sleuth/trpc";

const ENVPATH = path.resolve(__dirname, "../../../", ".env");
const env = dotENV.config({ path: ENVPATH });

const start = async () => {
    try {
        await fastifyApp.listen({
            port: 3001,
        });
        fastifyApp.log.info(
            `Server Started on: ${
                (fastifyApp.server.address() as AddressInfo).port
            }`
        );
    } catch (error) {
        fastifyApp.log.error(error);
        process.exit(1);
    }
};

start();

export {};
