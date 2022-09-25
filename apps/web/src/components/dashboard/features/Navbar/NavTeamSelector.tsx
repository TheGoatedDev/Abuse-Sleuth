import { useTeams } from "@contexts/TeamsContext";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { DashboardNavTeamButton } from "@abuse-sleuth/ui/components/compounds";

import routes from "@utils/routes";

export const NavTeamSelector: React.FC = () => {
    const { data: session } = useSession();
    const teams = useTeams();

    return (
        <DashboardNavTeamButton
            teams={teams.allTeams.sort(
                (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
            )}
            hrefGenerator={(id) => routes.team.viewTeam(id)}
            teamCreatehref={routes.team.createTeam}
            teamViewAllhref={routes.team.viewTeams}
            session={session}
            setActiveTeam={teams.setActiveTeam}
            activeTeam={teams.activeTeam}
        />
    );
};
