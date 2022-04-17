export const ROUTES = {
    baseURL: "http://localhost:3000",

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
            authenticate: "/api/auth/authenticate",
            logout: "/api/auth/logout",
        },
        // Everything Related to User
        user: {
            getCurrentUserInfo: "/api/user",
            updateCurrentUserInfo: "/api/user",
        },
        // Everything Related to Stripe
        stripe: {
            createCheckoutSession: "/api/stripe/checkout_session",
        },
        // Everything Related to Scans
        scans: {
            scanSingleIP: "/api/scan/scanip",
            scanLogs: "/api/scan/scanlog",
        },
        // Everything Related to Reports
        reports: {
            getSingleReport: "/api/report",
            getReports: "/api/reports",
        },
    },
};
