import { GetServerSideProps, NextPage } from "next";

import { Center, Paper, Title, Text, Divider } from "@abuse-sleuth/ui";

import ScanLogFile from "@components/forms/ScanLogFile";
import ScanLogText from "@components/forms/ScanLogText";
import { useAuth } from "@hooks/AuthHook";
import DashboardLayout from "@layouts/DashboardLayout";
import { getSession } from "@libs/auth/authServerHelpers";

const ScanLog: NextPage = () => {
    const auth = useAuth(true);
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
};

export default ScanLog;
