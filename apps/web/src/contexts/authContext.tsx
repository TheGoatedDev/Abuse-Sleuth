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
    const [user, setUser] = useState<User | undefined>(defaultState.user);
    const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);

    const query = trpc.useQuery(["user:me"]);

    useEffect(() => {
        if (query.isSuccess) {
            setUser(query.data);
        }
        setIsLoading(query.isLoading);
    }, [query.data, query.isLoading, query.isSuccess]);

    return (
        <authContext.Provider value={{ user, isLoading }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(authContext);
};
