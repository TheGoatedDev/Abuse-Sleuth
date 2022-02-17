import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import {
    Button,
    Center,
    Group,
    List,
    Space,
    Table,
    ThemeIcon,
    Title,
    Tooltip,
} from "@mantine/core";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAPILogReportIPProfiles } from "@services/api";
import BetterPaper from "@components/shared/BetterPaper";
import { BugIcon } from "@icons";
import { useAuth } from "@contexts/AuthProvider";
import { redirectIfNoAuth } from "@libs/helpers/redirectIfNoAuth";

const Reports_LogReportsID: NextPage = () => {
    const { user, loading, error } = useAuth();
    const router = useRouter();
    const [logReportIPProfiles, setLogReportIPProfiles] =
        useState<JSX.Element[]>();
    const [totalIP, setTotalIP] = useState<number>(0);

    const { logreportid: logReportID } = router.query;

    useEffect(() => {
        (async () => {
            if (user) {
                const { data: ipProfiles } = await getAPILogReportIPProfiles(
                    Number(logReportID),
                    user
                );

                setTotalIP(ipProfiles.length);

                setLogReportIPProfiles(
                    ipProfiles.map((ipProfile, index) => (
                        <tr key={index}>
                            <td>{ipProfile.ipAddress}</td>
                            <td>
                                <Group>
                                    <Tooltip label={"Abuse IP Database Source"}>
                                        <ThemeIcon
                                            color={
                                                Math.random() > 0.5
                                                    ? "green"
                                                    : "red"
                                            }
                                        >
                                            <BugIcon />
                                        </ThemeIcon>
                                    </Tooltip>
                                </Group>
                            </td>
                            <td>
                                <Group>
                                    <Button
                                        compact
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/ipprofile/${ipProfile.ipAddress}`
                                            )
                                        }
                                    >
                                        View
                                    </Button>
                                </Group>
                            </td>
                        </tr>
                    ))
                );
            }
        })();
    }, [user]);

    return (
        <LayoutDashboard>
            <Center>
                <Title>Report</Title>
            </Center>
            <Space h="md" />
            <Group position="center">
                <BetterPaper>
                    <Title order={2} align="center">
                        Details
                    </Title>
                    <List>
                        <List.Item>Report ID: {logReportID}</List.Item>
                        <List.Item>Total IPs Scanned: {totalIP}</List.Item>
                        <List.Item>Report Created At: TODO</List.Item>
                    </List>
                </BetterPaper>

                <Table>
                    <thead>
                        <tr>
                            <td>IP Address</td>
                            <td>Data Provider Scan Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>{logReportIPProfiles}</tbody>
                </Table>
            </Group>
        </LayoutDashboard>
    );
};

export default Reports_LogReportsID;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await redirectIfNoAuth(context);
};
