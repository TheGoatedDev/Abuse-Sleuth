import AuthForm from "@components/forms/authForm";
import LayoutStandard from "@components/layouts/LayoutStandard";
import useRedirectIfAuth from "@hooks/useRedirectIfAuth";
import { Center } from "@mantine/core";
import type { NextPage } from "next";

const Login: NextPage = () => {
    useRedirectIfAuth({ redirectTo: "/dashboard" });

    return (
        <LayoutStandard>
            <Center>
                <AuthForm />
            </Center>
        </LayoutStandard>
    );
};

export default Login;
