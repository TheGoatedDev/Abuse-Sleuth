import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

import { Center, Container, Loader, Table, Title } from "@abuse-sleuth/ui";

import { ReportItem } from "@components/tables/reportListViewer/reportItem";
import DashboardLayout from "@layouts/DashboardLayout";
import getReportsFromAPI from "@libs/api/helper/getReportsFromAPI";
import { getSession } from "@libs/auth/authServerHelpers";

export default function ReportViewer() {
    const [reports, setReports] = useState<React.ReactElement[]>([]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context.req, context.res);

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
