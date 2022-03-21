import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Center, Paper, Title, Text, Divider } from "@abuse-sleuth/ui";

import ScanLogFile from "@components/forms/ScanLogFile";
import ScanLogText from "@components/forms/ScanLogText";
import DashboardLayout from "@layouts/dashboardLayout";

export default function ScanLog() {
    return (
        <DashboardLayout>
            <Center
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <Paper
                    withBorder
                    p={"md"}
                    shadow={"md"}
                    sx={(theme) => ({ width: "400px" })}>
                    <Title align="center" order={2}>
                        Scan Log
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        Each IP counts as a scan towards your quota.
                    </Text>

                    <ScanLogText />

                    <Divider label="OR" labelPosition="center" my="md" />

                    <ScanLogFile />
                </Paper>
            </Center>
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    //console.log(session);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
