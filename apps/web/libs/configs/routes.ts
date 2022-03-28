export const ROUTES = {
    baseURL: "http://localhost:3000",

    auth: {
        login: "/auth/login",
    },

    api: {
        auth: {
            magicLinkSend: "/api/auth/magicLinkSend",
            magicLinkAuthenticate: "/api/auth/magicLinkAuthenticate",
            logout: "/api/auth/logout",
            user: "/api/auth/user",
        },
    },
};
