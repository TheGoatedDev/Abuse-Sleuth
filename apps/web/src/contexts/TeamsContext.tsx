import { createContext, useContext } from "react";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { Team } from "@abuse-sleuth/prisma";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { FCC } from "@abuse-sleuth/ui/types";

interface ITeamsContext {
    allTeams: Team[];
    activeTeam: Team | undefined;
    isLoading: boolean;
}

const TeamsContext = createContext<ITeamsContext>({
    allTeams: [],
    activeTeam: undefined,
    isLoading: true,
});

export const TeamsProvider: FCC = ({ children }) => {
    const { status } = useSession();

    const enabled = status === "authenticated";

    const getSelfAllTeamQuery = trpcClient.teams.getAllSelf.useQuery(
        undefined,
        { enabled }
    );
    const getSelfActiveTeamQuery = trpcClient.users.getActiveTeamSelf.useQuery(
        undefined,
        { enabled }
    );

    return (
        <TeamsContext.Provider
            value={{
                allTeams: getSelfAllTeamQuery.data ?? [],
                activeTeam: getSelfActiveTeamQuery.data ?? undefined,
                isLoading:
                    getSelfAllTeamQuery.isLoading ||
                    getSelfActiveTeamQuery.isLoading,
            }}>
            {children}
        </TeamsContext.Provider>
    );
};

export const useTeams = () => useContext(TeamsContext);
