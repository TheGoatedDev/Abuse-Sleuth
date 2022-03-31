import { AuthContext } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useSWRConfig } from "swr";
import { StytchUser } from "types/user";

import { ROUTES } from "@libs/configs/routes";

export const useAuth = (
    shouldAuth: boolean = false
): {
    loading: boolean;
    user?: StytchUser;
    logout: () => void;
} => {
    const { loading, user } = useContext(AuthContext);

    const router = useRouter();
    const { mutate } = useSWRConfig();

    const logout = () => {
        fetch(ROUTES.api.auth.logout).then(() => {
            mutate(ROUTES.api.auth.user);
            router.reload();
        });
    };

    useEffect(() => {
        if (!loading) {
            if (shouldAuth && !user) {
                router.push(ROUTES.auth.login);
            }
        }
    }, [loading, user, shouldAuth, router]);

    return { user, loading, logout };
};
