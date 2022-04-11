import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { GenericHTTPResponse } from "types/http";

import { User } from "@abuse-sleuth/prisma";

import { ROUTES } from "@libs/configs/routes";

export type IAuthContext = {
    loading: boolean;
    user?: User;
};

export const AuthContextDefaultValues: IAuthContext = {
    loading: true,
    user: null,
};

export const AuthContext = createContext<IAuthContext>(
    AuthContextDefaultValues
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const AuthProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(
        AuthContextDefaultValues.loading
    );
    const [user, setUser] = useState<User | null>(
        AuthContextDefaultValues.user
    );

    const { data, error } = useSWR<GenericHTTPResponse>(
        ROUTES.api.user.getCurrentUserInfo,
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
        if (error || data) {
            setLoading(false);
        }
    }, [data, error]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
