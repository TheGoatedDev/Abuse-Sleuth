import { useTeams } from "@contexts/TeamsContext";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { DashboardNavTeamButton } from "@abuse-sleuth/ui/components/compounds";

import routes from "@utils/routes";

export const NavTeamSelector: React.FC = () => {
    const { data: session } = useSession();
    const teams = useTeams();

    return (
        <DashboardNavTeamButton
            teamsWithPlan={teams.allTeams
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                .map((x) => ({
                    team: x,
                    planName: "Free",
                }))}
            hrefGenerator={(id) => routes.team.viewSingleTeam(id)}
            teamCreatehref={routes.team.createNewTeam}
            teamViewAllhref={routes.team.viewAllTeams}
            session={session}
            setActiveTeam={teams.setActiveTeam}
            activeTeam={teams.activeTeam}
        />
    );
};
