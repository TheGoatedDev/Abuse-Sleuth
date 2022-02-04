import { firebaseAuth } from "@services/firebase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LayoutLoading from "@components/layouts/LayoutLoading";

type IPropType = {
    redirect: string;
    authRequired?: boolean;
};

const ProtectedComponent: React.FC<IPropType> = ({
    redirect,
    authRequired,
    children,
}) => {
    const [visble, setVisble] = useState<boolean>(false);
    const [user, loading, _error] = useAuthState(firebaseAuth);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!authRequired) {
                if (user) {
                    router.push(redirect);
                } else {
                    setVisble(true);
                }
            } else {
                if (!user) {
                    router.push(redirect);
                } else {
                    setVisble(true);
                }
            }
        }
        //setVisble(false);
    }, [loading, user, authRequired, router, redirect]);

    return <>{visble ? children : <LayoutLoading />}</>;
};

export default ProtectedComponent;
