import { firebaseAuth } from "@services/firebase";
import { destroyCookie, setCookie } from "nookies";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useFirebaseCookieAuth = () => {
    const [user, loading, error] = useAuthState(firebaseAuth);

    useEffect(() => {
        (async () => {
            destroyCookie(null, "token");
            if (!loading) {
                if (error) {
                    destroyCookie(null, "token");
                    throw error;
                }
                if (user) {
                    setCookie(null, "token", await user.getIdToken(), {
                        maxAge: 60 * 60 * 24 * 7,
                        path: "/",
                    });
                } else {
                    destroyCookie(null, "token");
                }
            }
        })();
    }, [user, loading, error]);
};
