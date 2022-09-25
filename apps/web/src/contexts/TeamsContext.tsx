import { createContext, useContext, useEffect, useState } from "react";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { Team } from "@abuse-sleuth/prisma";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { FCC } from "@abuse-sleuth/ui/types";

interface ITeamsContext {
    allTeams: Team[];
    activeTeam: Team | undefined;
    setActiveTeam: (teamId: string) => void;
}

const TeamsContext = createContext<ITeamsContext>({
    allTeams: [],
    setActiveTeam: () => {},
    activeTeam: undefined,
});

export const TeamsProvider: FCC = ({ children }) => {
    const { status } = useSession();

    const enabled = status === "authenticated";

    const getSelfAllTeamQuery = trpcClient.teams.getSelfAllTeam.useQuery(
        undefined,
        { enabled }
    );
    const getSelfActiveTeamQuery = trpcClient.teams.getSelfActiveTeam.useQuery(
        undefined,
        { enabled }
    );
    const userSetActiveTeamMutation =
        trpcClient.users.setActiveTeam.useMutation();

    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTeam, setActiveTeamState] = useState<Team>();

    const setActiveTeam = async (teamId: string) => {
        await userSetActiveTeamMutation.mutateAsync({ teamId });
        await getSelfActiveTeamQuery.refetch();
    };

    useEffect(() => {
        setTeams(getSelfAllTeamQuery.data ?? []);
        setActiveTeamState(getSelfActiveTeamQuery.data ?? undefined);
    }, [getSelfAllTeamQuery.data, getSelfActiveTeamQuery.data]);

    return (
        <TeamsContext.Provider
            value={{
                allTeams: teams ?? [],
                setActiveTeam: setActiveTeam,
                activeTeam: activeTeam,
            }}>
            {children}
        </TeamsContext.Provider>
    );
};

export const useTeams = () => useContext(TeamsContext);
