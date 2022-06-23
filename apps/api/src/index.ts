import { AddressInfo } from "net";
import { fastifyApp } from "server";

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
