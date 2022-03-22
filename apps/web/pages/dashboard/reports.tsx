import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Container, Table, Title } from "@abuse-sleuth/ui";

import { ReportItem } from "@components/tables/reportListViewer/reportItem";
import DashboardLayout from "@layouts/DashboardLayout";
import getReportsFromAPI from "@libs/api/helper/getReportsFromAPI";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

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
