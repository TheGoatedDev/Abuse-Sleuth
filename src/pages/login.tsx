import AuthForm from "@components/forms/authForm";
import LayoutStandard from "@components/layouts/LayoutStandard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Center } from "@mantine/core";
import type { NextPage } from "next";

const Login: NextPage = () => {
    return (
        <ProtectedComponent redirect="/">
            <LayoutStandard>
                <Center>
                    <AuthForm />
                </Center>
            </LayoutStandard>
        </ProtectedComponent>
    );
};

export default Login;
