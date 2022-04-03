import React, { useEffect, useState } from "react";

import { Center, Container, Loader, Table, Title } from "@abuse-sleuth/ui";

import { ReportItem } from "@components/tables/reportListViewer/reportItem";
import { useAuth } from "@hooks/AuthHook";
import DashboardLayout from "@layouts/DashboardLayout";
import getReportsFromAPI from "@libs/api/helper/getReportsFromAPI";

export default function ReportViewer() {
    const auth = useAuth(true);
    const [reports, setReports] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getReportsFromAPI();

                setReports(
                    data.map((report, index) => (
                        <ReportItem key={index} report={report} />
                    ))
                );
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <DashboardLayout>
            <Container mt={"lg"}>
                <Title align="center">Report Viewer</Title>
                {reports.length > 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Report ID</th>
                                <th>Created At</th>
                                <th>Expires In</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{reports}</tbody>
                    </Table>
                ) : (
                    <Center>
                        <Loader mt={"xl"} />
                    </Center>
                )}
            </Container>
        </DashboardLayout>
    );
}
