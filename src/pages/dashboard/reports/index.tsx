import type { GetServerSideProps, NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";

import { Button, Center, Group, Table, Title } from "@mantine/core";

import { useEffect, useState } from "react";
import { deleteAPILogReport, getAPILogReports } from "@services/api";
import Logger from "@libs/utils/Logger";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/AuthProvider";
import { redirectIfNoAuth } from "@libs/helpers/redirectIfNoAuth";

const Reports: NextPage = () => {
    const { user, loading, error } = useAuth();
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

                Logger.info("UI /dashboard/reports", logReports);

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
                                            deleteReportOnClick(
                                                Number(report.id)
                                            )
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
    );
};

export default Reports;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await redirectIfNoAuth(context);
};
