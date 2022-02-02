import AuthForm from "@components/forms/authForm";
import LayoutStandard from "@components/layouts/LayoutStandard";
import { Center } from "@mantine/core";
import { supabaseAdmin } from "@services/supabase/supabaseAdmin";
import type { GetServerSideProps, NextPage } from "next";

const Login: NextPage = () => {
    return (
        <LayoutStandard>
            <Center>
                <AuthForm />
            </Center>
        </LayoutStandard>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { user } = await supabaseAdmin.auth.api.getUserByCookie(context.req);

    if (user) {
        return {
            props: {},
            redirect: {
                destination: "/dashboard",
            },
        };
    }

    return {
        props: {},
    };
};

export default Login;
