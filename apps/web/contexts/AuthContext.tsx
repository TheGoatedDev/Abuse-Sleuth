import { createContext, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

import { User } from "@abuse-sleuth/prisma";

import { ROUTES } from "@libs/configs/routes";

export type IAuthContext = {
    loading: boolean;
    user: User | null;
};

export const AuthContextDefaultValues: IAuthContext = {
    loading: true,
    user: null,
};

export const AuthContext = createContext<IAuthContext>(
    AuthContextDefaultValues
);

const getCurrentUserFetcher: Fetcher<GenericHTTPResponse<User>> = () =>
    fetch(ROUTES.api.user.getCurrentUserInfo).then((res) => res.json());

export const AuthProvider: React.FC = ({ children }) => {
    // Grab Getter and Setting for loading and user from AuthContext
    const [loading, setLoading] = useState<boolean>(
        AuthContextDefaultValues.loading
    );
    const [user, setUser] = useState<User | null>(
        AuthContextDefaultValues.user
    );

    // SWR for verifing cookie and getting user data.
    const { data, error } = useSWR<GenericHTTPResponse<User>>(
        "getCurrentUser",
        getCurrentUserFetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
        }
    );

    // Handle SWR changes
    useEffect(() => {
        setLoading(true);
        // Error if error
        if (error) {
            console.error(error);
            throw error;
        }

        // Set Context for user to user from SWR
        if (data) {
            if (data.ok) {
                setUser(data.data);
            } else {
                setUser(null);
            }
        }

        // Set Loading to false
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
