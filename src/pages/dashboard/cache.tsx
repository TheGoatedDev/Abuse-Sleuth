import {
    Title,
    Center,
    Table,
    Text,
    Box,
    Group,
    Checkbox,
    Pagination,
    Button,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { AIPDB_Report } from "@prisma/client";
import prisma from "../../lib/prisma";
import type { GetServerSideProps, NextPage } from "next";
import LayoutDashboard from "../../layouts/LayoutDashboard";
import { useEffect, useState } from "react";
import { getCache } from "../../lib/helpers/apiHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Cache: NextPage = (props) => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState<JSX.Element[] | null>(null);

    const incrementPage = () => {
        setPage(page + 1);
    };

    const decrementPage = () => {
        setPage(page - 1);
    };

    useEffect(() => {
        (async () => {
            const reports = await getCache(page, 30);
            const elements = reports.map((report) => (
                <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.ipAddress}</td>
                    <td>{report.abuseScore}%</td>
                    <td>{report.country}</td>
                    <td>{report.usageType}</td>
                    <td>{report.isp}</td>
                    <td>{report.domain}</td>
                    <td>{report.totalReports}</td>
                    <td>{report.totalDistinctReportee}</td>
                    <td>{report.updatedAt}</td>
                </tr>
            ));
            setRows(elements);
        })();
    }, [page]);

    return (
        <LayoutDashboard>
            <Title align="center">View Cache</Title>
            <Center mt="md">
                <Group grow direction="column" style={{ width: "100%" }}>
                    <div>
                        <Title order={3} align="center">
                            Filter
                        </Title>
                        <Checkbox label="ID" />
                    </div>
                    <div>
                        <Center>
                            <Button
                                mr="xs"
                                compact
                                onClick={() => {
                                    decrementPage();
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Button>
                            <Text>Page {page}</Text>
                            <Button
                                ml="xs"
                                compact
                                onClick={() => {
                                    incrementPage();
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                        </Center>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>IP</th>
                                    <th>Abuse Score</th>
                                    <th>Country Code</th>
                                    <th>Usage Type</th>
                                    <th>ISP</th>
                                    <th>Domain</th>
                                    <th>Total Reports</th>
                                    <th>Total Distinct Reportee</th>
                                    <th>Last Scan</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </div>
                </Group>
            </Center>
        </LayoutDashboard>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const AIPDB_Reports = await prisma.aIPDB_Report.findMany({
        orderBy: {
            abuseScore: "desc",
        },
    });
    const { page } = context.query;

    return { props: { page: page ?? 1, reports: AIPDB_Reports } };
};

export default Cache;
