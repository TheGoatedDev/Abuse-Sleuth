import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useSWRConfig } from "swr";

import { User } from "@abuse-sleuth/prisma";

import { ROUTES } from "@utils/configs/routes";
import { AuthContext } from "@utils/contexts/AuthContext";

export const useAuth = (
    shouldAuth: boolean = false
): {
    loading: boolean;
    user: User | null;
    logout: () => void;
} => {
    // Get values from Auth Context
    const { loading, user } = useContext(AuthContext);

    const router = useRouter();
    const { mutate } = useSWRConfig();

    // Logout Method
    const logout = async () => {
        // Send a request to Logout
        await fetch(ROUTES.api.auth.logout);
        // Refresh SWR
        await mutate("getCurrentUser");
        // Redirect to Login
        router.push(ROUTES.auth.login);
    };

    // Redirects if required
    useEffect(() => {
        //console.log(loading, user, shouldAuth);
        if (!loading) {
            if (shouldAuth && user === null) {
                router.push(ROUTES.auth.login);
            }
        }
    }, [loading, user, shouldAuth, router]);

    return { user, loading, logout };
};
