export const routes = {
    home: "/",
    pricing: "/pricing",

    auth: {
        newUser: "/auth/newuser",
        login: "/auth/signin",
    },
    account: {
        viewCurrentAccount: "/account",
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
        viewAllReports: "/report/",
        createNewReport: "/report/create",
    },
};

export default routes;
