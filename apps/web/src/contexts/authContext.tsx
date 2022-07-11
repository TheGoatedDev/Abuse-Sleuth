import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@abuse-sleuth/prisma";
import { FCC } from "@abuse-sleuth/ui";

import { trpc } from "@utils/trpc/reactQueryHooks";

interface IAuthContext {
    user?: User;
    isLoading: boolean;
}

const defaultState: IAuthContext = {
    user: undefined,
    isLoading: true,
};

const authContext = createContext<IAuthContext>(defaultState);

export const AuthProvider: FCC = ({ children }) => {
    const [authenticationState, setAuthenticationState] =
        useState<IAuthContext>(defaultState);

    const query = trpc.useQuery(["user:me"]);

    // Verify User Login Status
    useEffect(() => {
        if (!authenticationState.isLoading) {
            if (query.data) {
                setAuthenticationState({
                    ...authenticationState,
                    user: query.data,
                });
            }
        } else {
            setAuthenticationState({
                ...authenticationState,
                isLoading: query.isLoading,
            });
        }
    }, [authenticationState, query.data, query.isLoading, query.isSuccess]);

    return (
        <authContext.Provider value={authenticationState}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(authContext);
};
