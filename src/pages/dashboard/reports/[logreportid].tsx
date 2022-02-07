import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Center, Group, List, Paper, Space, Table, Title } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAPILogReportIPProfiles } from "@services/api";

const Reports_LogReportsID: NextPage = () => {
    const [user, loading, error] = useAuthState(firebaseAuth);
    const router = useRouter();
    const [logReportIPProfiles, setLogReportIPProfiles] =
        useState<JSX.Element[]>();

    const { logreportid: logReportID } = router.query;

    useEffect(() => {
        (async () => {
            if (user) {
                const { data: ipProfiles } = await getAPILogReportIPProfiles(
                    Number(logReportID),
                    user
                );

                setLogReportIPProfiles(
                    ipProfiles.map((ipProfile, index) => (
                        <tr key={index}>
                            <td>{ipProfile.ipAddress}</td>
                        </tr>
                    ))
                );
            }
        })();
    }, [user]);

    return (
        <ProtectedComponent authRequired redirect="/login">
            <LayoutDashboard>
                <Center>
                    <Title>Report</Title>
                </Center>
                <Space h="md" />
                <Group position="center">
                    <Paper
                        sx={(theme) => ({
                            backgroundColor: theme.colors.gray[8],
                        })}
                        padding={"xl"}
                        shadow={"md"}
                    >
                        <List>
                            <List.Item>Report ID: {logReportID}</List.Item>
                            <List.Item>Total IPs Scanned: TODO</List.Item>
                            <List.Item>Report Created At: TODO</List.Item>
                        </List>
                    </Paper>

                    <Table>
                        <thead>
                            <tr>IP Address</tr>
                        </thead>
                        <tbody>{logReportIPProfiles}</tbody>
                    </Table>
                </Group>
            </LayoutDashboard>
        </ProtectedComponent>
    );
};

export default Reports_LogReportsID;
