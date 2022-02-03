import { firebaseAuth } from "@services/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type IProps = {
    redirectTo: string;
};

const useRedirectIfNotAuth = (props: IProps) => {
    const [user, loading, error] = useAuthState(firebaseAuth);
    const router = useRouter();
    useEffect(() => {
        if (!user && !loading) {
            router.push(props.redirectTo);
        }
    }, [user, loading, router, props.redirectTo]);
};

export default useRedirectIfNotAuth;
