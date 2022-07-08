import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import jwt from "jsonwebtoken";

import { awsCognitoAuth } from "@abuse-sleuth/auth";
import { prisma, User } from "@abuse-sleuth/prisma";

export async function createContext({
    req: request,
    res: response,
}: CreateFastifyContextOptions) {
    const accessToken = request.cookies["accessToken"] ?? undefined;
    let user: User | undefined = undefined;

    if (accessToken) {
        const authed = await awsCognitoAuth.verifyToken(accessToken);

        if (authed) {
            const payload = jwt.decode(accessToken as string);
            const id = (payload as jwt.JwtPayload)["username"] as string;
            user = await awsCognitoAuth.getUserByID(id);
        }
    }

    return { request, response, accessToken, prisma, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
