import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import jwt from "jsonwebtoken";

import { awsCognitoAuth } from "@abuse-sleuth/auth";
import { prisma, User } from "@abuse-sleuth/prisma";

export async function createContext({
    req: request,
    res: response,
}: CreateFastifyContextOptions) {
    const accessToken = request.cookies["accessToken"] || null;
    const refreshToken = request.cookies["refreshToken"] || null;
    let user: User | null = null;

    try {
        request.log.debug("Attempting Access Token");
        const isValidToken = await awsCognitoAuth.verifyToken(
            accessToken ?? ""
        );

        if (!isValidToken) {
            // If Access Token is Valid
            request.log.debug("Authenticating with Access Token");
            const payload = jwt.decode(accessToken as string);
            const id = (payload as jwt.JwtPayload)["username"] as string;
            user = await awsCognitoAuth.getUserByID(id);
        } else {
            throw new Error("Not Valid Token");
        }

        return { request, response, prisma, user };
    } catch (error) {
        request.log.debug("Attempting to Renew Access Token");
        if (refreshToken && accessToken) {
            request.log.debug("Using Access and Refresh Token to Renew");
            const tokens = await awsCognitoAuth.renewTokens(
                accessToken,
                refreshToken
            );
            request.log.debug(`Got Tokens: ${JSON.stringify(tokens, null, 4)}`);

            // Set Cookies from Refreshed Sessions
            response.setCookie("accessToken", tokens.accessToken, {
                path: "/",
                sameSite: "strict",
                httpOnly: true,
            });
            response.setCookie("refreshToken", tokens.refreshToken, {
                path: "/",
                sameSite: "strict",
                httpOnly: true,
            });
            request.log.debug(`Authentication Cookies Refreshed`);

            request.log.debug("Reauthenticating with New Access Token");
            const payload = jwt.decode(tokens.accessToken as string);
            const id = (payload as jwt.JwtPayload)["username"] as string;
            user = await awsCognitoAuth.getUserByID(id);
        } else {
            request.log.debug("No Access or Refresh Token, Clearing Cookies");
            response.clearCookie("accessToken", {
                path: "/",
                sameSite: "strict",
                httpOnly: true,
            });
            response.clearCookie("refreshToken", {
                path: "/",
                sameSite: "strict",
                httpOnly: true,
            });
        }

        return { request, response, prisma, user };
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;
