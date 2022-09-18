// TODO: Create Route Helpers to assist in changing routes/path globally
export const routes = {
    home: "/",
    pricing: "/pricing",

    auth: {
        newUser: "/auth/new-user",
        login: "/auth/sign-in",
    },
    account: {
        viewCurrentAccount: "/account",
    },
    dashboard: {
        home: "/",
    },
    team: {
        viewAllTeams: "/team/",
        viewSingleTeam: (teamId: string) => `/teams/view/${teamId}`,
        createNewTeam: "/team/create",
    },
    report: {
        viewAllReports: "/report/",
        createNewReport: "/report/create",
    },
};

export default routes;
