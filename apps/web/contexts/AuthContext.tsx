import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { StytchUser } from "types/user";

import { ROUTES } from "@libs/configs/routes";

export type IAuthContext = {
    loading: boolean;
    user?: StytchUser;
};

export const AuthContextDefaultValues: IAuthContext = {
    loading: true,
    user: undefined,
};

export const AuthContext = createContext<IAuthContext>(
    AuthContextDefaultValues
);

const fetcher = (url) => fetch(url).then((res) => res.json());

export const AuthProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(
        AuthContextDefaultValues.loading
    );
    const [user, setUser] = useState<StytchUser | undefined>(
        AuthContextDefaultValues.user
    );

    const { data, error } = useSWR<GenericHTTPResponse>(
        ROUTES.api.auth.user,
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
        }
    );

    useEffect(() => {
        setLoading(true);
        if (error) {
            console.error(error);
            throw error;
        }

        if (data) {
            if (data.ok) {
                setUser(data.data);
            } else {
                setUser(undefined);
            }
        }
        setLoading(false);
    }, [data, error]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
