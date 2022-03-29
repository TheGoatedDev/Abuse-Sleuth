import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { StytchUser } from "types/user";

import { ROUTES } from "@libs/configs/routes";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useAuth = (): {
    loading: boolean;
    user?: StytchUser;
    logout: () => void;
} => {
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState<StytchUser | undefined>(undefined);

    const router = useRouter();

    const { mutate } = useSWRConfig();
    const { data, error } = useSWR<GenericHTTPResponse>(
        ROUTES.api.auth.user,
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
        }
    );

    const logout = () => {
        fetch(ROUTES.api.auth.logout).then(() => {
            mutate(ROUTES.api.auth.user);
            router.reload();
        });
    };

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

    return { user, loading, logout };
};
