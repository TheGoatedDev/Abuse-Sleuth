import EnvConfig from "./env";

export const ROUTES = {
    home: "/",

    auth: {
        login: "/login",
    },

    dashboard: {
        home: "/dashboard",
    },

    api: {
        // Everything Related to Authentication
        auth: {
            authenticate: EnvConfig.apiURL + "/api/v1/auths/",
            logout: EnvConfig.apiURL + "/api/auth/logout",
        },
        // Everything Related to User
        user: {
            getCurrentUserInfo: EnvConfig.apiURL + "/api/user",
            updateCurrentUserInfo: EnvConfig.apiURL + "/api/user",
        },
        // Everything Related to Stripe
        stripe: {
            createCheckoutSession:
                EnvConfig.apiURL + "/api/stripe/checkout_session",
        },
        // Everything Related to Scans
        scans: {
            scanSingleIP: EnvConfig.apiURL + "/api/scan/scanip",
            scanLogs: EnvConfig.apiURL + "/api/scan/scanlog",
        },
        // Everything Related to Reports
        reports: {
            getSingleReport: EnvConfig.apiURL + "/api/report",
            getReports: EnvConfig.apiURL + "/api/reports",
        },
    },
};
