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
        viewAll: "/team/",
        view: (teamId: string) => `/team/${teamId}`,
        create: "/team/create",
        edit: (teamId: string) => `/team/${teamId}/edit`,
        addMember: (teamId: string) => `/team/${teamId}/addmember`,
    },
    report: {
        viewAll: "/report/",
        create: "/report/create",
    },
};

export default Routes;
