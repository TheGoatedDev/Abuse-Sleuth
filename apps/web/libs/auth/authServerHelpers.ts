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
        console.time("Get Session Auth Token");
        const authRes = await StytchClient.sessions.authenticateJwt(
            tokenCookie.toString()
        );
        console.timeEnd("Get Session Auth Token");

        console.time("Get Session Get User");
        const user = await StytchClient.users.get(authRes.session.user_id);
        console.timeEnd("Get Session Get User");

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
