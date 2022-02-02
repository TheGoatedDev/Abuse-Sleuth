import { Center, Title } from "@mantine/core";
import { supabaseAdmin } from "@services/supabase/supabaseAdmin";
import type { GetServerSideProps, NextPage } from "next";
import LogScanForm from "../../components/forms/logScanForm";
import LayoutDashboard from "../../components/layouts/LayoutDashboard";

const Scan: NextPage = () => {
    return (
        <LayoutDashboard>
            <Title align="center">Log Scan</Title>
            <Center mt="md">
                <div style={{ width: "300px" }}>
                    <LogScanForm />
                </div>
            </Center>
        </LayoutDashboard>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { user } = await supabaseAdmin.auth.api.getUserByCookie(context.req);

    if (!user) {
        return {
            props: {},
            redirect: {
                destination: "/login",
            },
        };
    }

    return {
        props: {},
    };
};

export default Scan;
