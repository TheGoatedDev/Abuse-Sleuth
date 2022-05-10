import { prisma, User } from "@abuse-sleuth/prisma";

import { StytchClient } from "./StytchClient";

export const getSession = async (token: string): Promise<User | null> => {
    try {
        const authRes = await StytchClient.sessions.authenticateJwt(
            token.toString()
        );

        const user = await prisma.user.findFirst({
            where: {
                stytchUserID: authRes.session.user_id,
            },
        });

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
};
