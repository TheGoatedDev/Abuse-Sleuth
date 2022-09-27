export const routes = {
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
        viewAll: "/team/",
        view: (teamId: string) => `/team/${teamId}/view`,
        create: "/team/create",
        edit: (teamId: string) => `/team/${teamId}/edit`,
        addMember: (teamId: string) => `/team/${teamId}/addmember`,
    },
    report: {
        viewReports: "/report/",
        createReport: "/report/create",
    },
};

export default routes;
