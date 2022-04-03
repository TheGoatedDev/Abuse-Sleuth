import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useSWRConfig } from "swr";
import { StytchUser } from "types/user";

import { AuthContext } from "@contexts/AuthContext";
import { ROUTES } from "@libs/configs/routes";

export const useAuth = (
    shouldAuth: boolean = false
): {
    loading: boolean;
    user: StytchUser | null;
    logout: () => void;
} => {
    const { loading, user } = useContext(AuthContext);

    const router = useRouter();
    const { mutate } = useSWRConfig();

    const logout = async () => {
        await fetch(ROUTES.api.auth.logout);
        await mutate(ROUTES.api.auth.user);
        router.push(ROUTES.auth.login);
    };

    // TODO: I AM FUCKING BROKE
    useEffect(() => {
        console.log(loading, user, shouldAuth);
        if (!loading) {
            if (shouldAuth && user === null) {
                router.push(ROUTES.auth.login);
            }
        }
    }, [loading, user, shouldAuth, router]);

    return { user, loading, logout };
};
