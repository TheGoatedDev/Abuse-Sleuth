import { GenericHTTPResponse } from "types/http";

import { User } from "@abuse-sleuth/prisma";

import { ROUTES } from "@libs/configs/routes";

export const getUser = async (): Promise<GenericHTTPResponse<User>> => {
    return await (await fetch(ROUTES.api.auth.user)).json();
};

// FIXME: THIS JUST DOESN'T WORK
export const getGithubAuth = async () => {
    const params = {
        public_token: process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN,
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map((k) => esc(k) + "=" + esc(params[k]))
        .join("&");

    try {
        const response = await fetch(
            "https://test.stytch.com/v1/public/oauth/github/start?" + query,
            {
                method: "GET",

                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );

        console.log(await response.json());
    } catch (error) {
        console.error(error);
    }
};
