import { NextApiRequest } from "next";

import { User } from "@abuse-sleuth/prisma";

type GenericHTTPResponse<T = any> = {
    ok: boolean;
    error?: string;
    data?: T;
};

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type NextApiRequestWithUser = NextApiRequest & { user?: User };
