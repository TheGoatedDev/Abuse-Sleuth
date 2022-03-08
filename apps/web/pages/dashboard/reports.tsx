import { useEffect, useState } from "react";

import { ReportItem } from "@components/tables/reportViewer/reportItem";
import DashboardLayout from "@layouts/dashboardLayout";
import getReportsFromAPI from "@libs/api/helper/getReportsFromAPI";

import { Container, Table, Title } from "@mantine/core";

export default function ReportViewer() {
    const [reports, setReports] = useState<JSX.Element[]>();

    useEffect(() => {
        (async () => {
            const data = await getReportsFromAPI();

            setReports(
                data.map((report, index) => (
                    <ReportItem key={index} report={report} />
                ))
            );
        })();
    }, []);

    return (
        <DashboardLayout>
            <Container mt={"lg"}>
                <Title align="center">Report Viewer</Title>
                <Table>
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Created At</th>
                            <th>Expires At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{reports}</tbody>
                </Table>
            </Container>
        </DashboardLayout>
    );
}
