import type { NextPage } from "next";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import ProtectedComponent from "@components/shared/routes/ProtectedComponent";
import { Button, Center, Group, Space, Table, Title } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";
import { useEffect, useState } from "react";
import { getAPILogReports } from "@services/api";
import logger from "@libs/utils/logger";

const Reports: NextPage = () => {
    const [user, loading, error] = useAuthState(firebaseAuth);

    const [reports, setReports] = useState<any>();

    useEffect(() => {
        (async () => {
            if (user) {
                const logReportsWebRequest = await getAPILogReports(user!);

                const logReports: IAPILogReport[] = logReportsWebRequest.data;

                logger.info(logReports);

                setReports(
                    logReports.map((report: IAPILogReport, index) => (
                        <tr key={index}>
                            <td>{report["itemCount"]}</td>
                            <td>{report.createdAt}</td>
                            <td>
                                <Group>
                                    <Button compact>View</Button>

                                    <Button color="red" compact>
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
