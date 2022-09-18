import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient =
    (globalThis as any).prisma ||
    new PrismaClient({
        log: ["error", "warn"],
    });

// prisma.$use(async (params, next) => {
//     const results = await next(params);

//     if (params.model === "User" && params.action === "findUnique") {
//         console.log(params.args);
//         results["stripeCustomer"] = await stripe.customers.retrieve(
//             results["stripeCustomerId"]
//         );
//     }
//     return results;
// });

if (process.env.NODE_ENV !== "production") {
    (globalThis as any).prisma = prisma;
}

export * from "@prisma/client";
