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
        viewAllTeams: "/team/",
        viewSingleTeam: (teamId: string) => `/team/view/${teamId}`,
        createNewTeam: "/team/create",
    },
    report: {
        viewAllReports: "/report/",
        createNewReport: "/report/create",
    },
};

export default routes;
