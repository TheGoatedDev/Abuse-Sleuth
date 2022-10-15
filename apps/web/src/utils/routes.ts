export const Routes = {
    home: "/",
    pricing: "/pricing",

    auth: {
        newUser: "/auth/newuser",
        login: "/auth/signin",
    },
    account: {
        viewAccount: "/account",
    },
    dashboard: {
        home: "/dashboard/",
    },
    team: {
        view: (teamId: string) => `/team/${teamId}`,
        billing: (teamId: string) => `/team/${teamId}/billing`,
    },
    report: {
        viewAll: "/report/",
        create: "/report/create",
    },
};

export default Routes;
