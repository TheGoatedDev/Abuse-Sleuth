import LayoutStandard from "@components/layouts/LayoutStandard";
import useRedirectIfNotAuth from "@hooks/useRedirectIfNotAuth";
import { Center } from "@mantine/core";
import { firebaseAuth } from "@services/firebase";
import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile: NextPage = () => {
    const [user, loading, error] = useAuthState(firebaseAuth);

    useRedirectIfNotAuth({ redirectTo: "/login" });

    return (
        <LayoutStandard>
            <Center>
                <code>{user?.email}</code>
            </Center>
        </LayoutStandard>
    );
};

export default Profile;
