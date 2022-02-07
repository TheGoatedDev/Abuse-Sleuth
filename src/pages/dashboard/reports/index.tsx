import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Button, Center, Group, Table, Title } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";
import { useEffect, useState } from "react";
import { deleteAPILogReport, getAPILogReports } from "@services/api";
import logger from "@libs/utils/logger";
import { useRouter } from "next/router";

const Reports: NextPage = () => {
    const [user, loading, error] = useAuthState(firebaseAuth);
    const [reports, setReports] = useState<JSX.Element[]>();

    const router = useRouter();

    const deleteReportOnClick = async (reportID: number) => {
        await deleteAPILogReport(reportID, user!);
        router.reload();
    };

    useEffect(() => {
        (async () => {
            if (user) {
                const logReportsWebRequest = await getAPILogReports(user);

                const logReports: IAPILogReport[] = logReportsWebRequest.data;

                logger.info(logReports);

                setReports(
                    logReports.map((report: IAPILogReport, index) => (
                        <tr key={index}>
                            <td>{report["itemCount"]}</td>
                            <td>{report.createdAt}</td>
                            <td>
                                <Group>
                                    <Button
                                        compact
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/reports/${report.id}`
                                            )
                                        }
                                    >
                                        View
                                    </Button>

                                    <Button
                                        color="red"
                                        compact
                                        onClick={() =>
                                            deleteReportOnClick(report.id)
                                        }
                                    >
                                        Delete
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
        <ProtectedComponent authRequired redirect="/login">
            <LayoutDashboard>
                <Center>
                    <Title>Reports</Title>
                </Center>
                <Table>
                    <thead>
                        <tr>
                            <th>IP #</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{reports}</tbody>
                </Table>
            </LayoutDashboard>
        </ProtectedComponent>
    );
};

export default Reports;
