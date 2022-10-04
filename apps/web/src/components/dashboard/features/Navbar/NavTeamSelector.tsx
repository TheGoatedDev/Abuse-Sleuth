import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { DashboardNavTeamButton } from "@abuse-sleuth/ui/components/compounds";

import Routes from "@utils/routes";

import { openTeamCreateModal } from "../modals/TeamCreateModal";

export const NavTeamSelector: React.FC = () => {
    const { data: session } = useSession();

    const context = trpcClient.useContext();

    const getTeamsSelf = trpcClient.teams.getAllSelf.useQuery();

    const getActiveTeam = trpcClient.users.getActiveTeamSelf.useQuery();

    const userSetActiveTeamMutation =
        trpcClient.users.setActiveTeamSelf.useMutation({
            onSuccess() {
                context.users.getActiveTeamSelf.invalidate();
            },
        });

    return (
        <DashboardNavTeamButton
            teams={
                getTeamsSelf.data?.sort(
                    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                ) ?? []
            }
            hrefGenerator={(id) => Routes.team.view(id)}
            teamCreateOnClick={() => openTeamCreateModal()}
            session={session}
            setActiveTeam={(teamId) =>
                userSetActiveTeamMutation.mutate({ teamId })
            }
            activeTeam={getActiveTeam.data ?? undefined}
        />
    );
};
