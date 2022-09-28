import { useTeams } from "@contexts/TeamsContext";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { DashboardNavTeamButton } from "@abuse-sleuth/ui/components/compounds";

import Routes from "@utils/routes";

export const NavTeamSelector: React.FC = () => {
    const { data: session } = useSession();
    const teams = useTeams();

    return (
        <DashboardNavTeamButton
            teams={teams.allTeams.sort(
                (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
            )}
            hrefGenerator={(id) => Routes.team.view(id)}
            teamCreatehref={Routes.team.create}
            teamViewAllhref={Routes.team.viewAll}
            session={session}
            setActiveTeam={teams.setActiveTeam}
            activeTeam={teams.activeTeam}
        />
    );
};
