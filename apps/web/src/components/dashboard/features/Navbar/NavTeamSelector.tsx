import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { DashboardNavTeamButton } from "@abuse-sleuth/ui/components/compounds";

import routes from "@utils/routes";

export const NavTeamSelector: React.FC = () => {
    const { data: session } = useSession();

    const getSelfAllTeamQuery = trpcClient.teams.getSelfAllTeam.useQuery();
    const userSetActiveTeamMutation =
        trpcClient.users.setActiveTeam.useMutation();

    return (
        <DashboardNavTeamButton
            teamsWithPlan={
                getSelfAllTeamQuery.data?.map((x) => ({
                    team: x,
                    planName: "Free",
                })) ?? []
            }
            hrefGenerator={(id) => routes.team.viewSingleTeam(id)}
            teamCreatehref={routes.team.createNewTeam}
            teamViewAllhref={routes.team.viewAllTeams}
            session={session}
            setActiveTeam={(teamId) => {
                userSetActiveTeamMutation.mutate({ teamId });
            }}
        />
    );
};
