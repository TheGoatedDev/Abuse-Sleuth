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
        viewTeams: "/team/",
        viewTeam: (teamId: string) => `/team/view/${teamId}`,
        createTeam: "/team/create",
        editTeam: (teamId: string) => `/team/edit/${teamId}`,
    },
    report: {
        viewReports: "/report/",
        createReport: "/report/create",
    },
};

export default routes;
