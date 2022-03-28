import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { StytchUser } from "types/user";

import { ROUTES } from "@libs/configs/routes";

const AuthContext = createContext<{
    isAuthenticated: boolean;
    user?: StytchUser;
    loading: boolean;
}>({
    isAuthenticated: false,
    user: null,
    loading: true,
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export const AuthProvider: React.FC = ({ children }) => {
    const { data, error } = useSWR<GenericHTTPResponse>(
        ROUTES.api.auth.user,
        fetcher,
        {
            refreshInterval: 2500,
            revalidateIfStale: true,
            revalidateOnFocus: true,
        }
    );

    const [loading, setLoading] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<StytchUser | null>(null);

    useEffect(() => {
        setLoading(true);
        if (error) {
            console.error(error);
            throw error;
        }

        if (data) {
            if (data.ok) {
                setIsAuthenticated(true);
                setUser(data.data);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        setLoading(false);
    }, [data, error]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (redirectIfAuth?: string, redirectIfNoAuth?: string) => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (loading === false) {
            if (redirectIfAuth && redirectIfNoAuth) {
                throw new Error(
                    "You can't use both redirectIfAuth and redirectIfNoAuth"
                );
            }

            if (redirectIfAuth && isAuthenticated) {
                router.push(redirectIfAuth);
            }

            if (redirectIfNoAuth && !isAuthenticated) {
                router.push(redirectIfNoAuth);
            }
        }
    }, [loading, isAuthenticated, redirectIfAuth, redirectIfNoAuth, router]);

    return { isAuthenticated, user, loading };
};

export default AuthContext;
