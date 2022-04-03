import { getCookie } from "cookies-next";
import { StytchUser } from "types/user";

import { StytchClient } from "@abuse-sleuth/auth";
import { prisma, User } from "@abuse-sleuth/prisma";

// TODO: Do Correct Type for params
export const getSession = async (req: any, res: any): Promise<User | null> => {
    const tokenCookie = getCookie("token", { req, res });

    if (!tokenCookie) {
        return null;
    }

    try {
        const authRes = await StytchClient.sessions.authenticateJwt(
            tokenCookie.toString()
        );

        const user = await prisma.user.findFirst({
            where: {
                stytchUserID: authRes.session.user_id,
            },
        });

        return user;
    } catch (error) {
        throw new Error(error);
    }
};
