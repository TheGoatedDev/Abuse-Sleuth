type GenericHTTPResponse<T = any> = {
    ok: boolean;
    data: T;
};

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";
