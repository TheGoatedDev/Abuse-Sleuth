type GenericHTTPResponse<T = any> = {
    ok: boolean;
    error?: string;
    data?: T;
};

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type NextApiRequestWithUser = import("next").NextApiRequest & {
    user?: import("@abuse-sleuth/prisma").User;
};
