import { GenericHTTPResponse } from "types/http";

import { User } from "@abuse-sleuth/prisma";

import { ROUTES } from "@libs/configs/routes";

export const getUser = async (): Promise<GenericHTTPResponse<User>> => {
    return await (await fetch(ROUTES.api.user.getCurrentUserInfo)).json();
};
