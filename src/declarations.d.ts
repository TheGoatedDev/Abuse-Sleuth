import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient;

    interface GlobalInterface {
        value: unknown;
    }

    type GlobalType = {
        value: unknown;
    };
}

export {};
