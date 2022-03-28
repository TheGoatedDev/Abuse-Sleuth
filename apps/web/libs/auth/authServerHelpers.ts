import { getCookie } from "cookies-next";
import { StytchUser } from "types/user";

import { stytchClient } from "./stytchClient";

// TODO: Do Correct Type for params
export const getSession = async (
    req: any,
    res: any
): Promise<StytchUser | null> => {
    const tokenCookie = getCookie("token", { req, res });

    if (!tokenCookie) {
        throw new Error("No token cookie found");
    }

    try {
        const authRes = await stytchClient.sessions.authenticate({
            session_jwt: tokenCookie.toString(),
        });

        const user = await stytchClient.users.get(authRes.session.user_id);

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
