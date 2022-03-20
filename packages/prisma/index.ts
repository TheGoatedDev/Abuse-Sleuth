import { PrismaClient } from "@prisma/client";

export const prisma =
    (globalThis as any).prisma ||
    new PrismaClient({
        log: ["error", "warn"],
    });

if (process.env.NODE_ENV !== "production") {
    (globalThis as any).prisma = prisma;
}

export * from "@prisma/client";
