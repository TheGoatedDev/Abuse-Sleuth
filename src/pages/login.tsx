import AuthForm from "@components/forms/authForm";
import LayoutStandard from "@components/layouts/LayoutStandard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Center } from "@mantine/core";
import { firebaseAuth } from "@services/firebase";
import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";

const Login: NextPage = () => {
    const [user, loading, _error] = useAuthState(firebaseAuth);

    return (
        <ProtectedComponent redirect="/" user={user} loading={loading}>
            <LayoutStandard>
                <Center>
                    <AuthForm />
                </Center>
            </LayoutStandard>
        </ProtectedComponent>
    );
};

export default Login;
