import { getCookie } from "cookies-next";
import { StytchUser } from "types/user";

import { StytchClient } from "@abuse-sleuth/auth";

// TODO: Do Correct Type for params
export const getSession = async (
    req: any,
    res: any
): Promise<StytchUser | null> => {
    const tokenCookie = getCookie("token", { req, res });

    if (!tokenCookie) {
        return null;
    }

    try {
        const authRes = await StytchClient.sessions.authenticateJwt(
            tokenCookie.toString()
        );
        const user = await StytchClient.users.get(authRes.session.user_id);

        const stytchUser: StytchUser = {
            id: user.user_id,
            emails: user.emails,
            name: user.name,
        };

        return stytchUser;
    } catch (error) {
        throw new Error(error);
    }
};
