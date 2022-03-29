import { AuthContext } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSWRConfig } from "swr";
import { StytchUser } from "types/user";

import { ROUTES } from "@libs/configs/routes";

export const useAuth = (): {
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

    return { user, loading, logout };
};
