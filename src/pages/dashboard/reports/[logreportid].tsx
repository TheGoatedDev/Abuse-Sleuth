import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import {
    Button,
    Center,
    Group,
    List,
    Paper,
    Space,
    Table,
    ThemeIcon,
    Title,
    Tooltip,
} from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAPILogReportIPProfiles } from "@services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import BetterPaper from "@components/shared/BetterPaper";

const Reports_LogReportsID: NextPage = () => {
    const [user, loading, _error] = useAuthState(firebaseAuth);
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
                                            <FontAwesomeIcon icon={faBug} />
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
        <ProtectedComponent
            authRequired
            redirect="/login"
            user={user}
            loading={loading}
        >
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
        </ProtectedComponent>
    );
};

export default Reports_LogReportsID;
