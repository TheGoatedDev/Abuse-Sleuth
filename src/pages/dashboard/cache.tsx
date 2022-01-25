import {
    Title,
    Center,
    Table,
    Text,
    Box,
    Group,
    Button,
    SegmentedControl,
    Container,
} from "@mantine/core";
import type { NextPage } from "next";
import LayoutDashboard from "../../layouts/LayoutDashboard";
import { useEffect, useState } from "react";
import { getCache } from "../../lib/helpers/apiHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Cache: NextPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState("15");
    const [rows, setRows] = useState<JSX.Element[] | null>(null);

    const incrementPage = () => {
        setPage(page + 1);
    };

    const decrementPage = () => {
        setPage(page - 1);
    };

    useEffect(() => {
        (async () => {
            const reports = await getCache(page, Number(size));
            if (reports.length === 0) {
                return setPage(page < 1 ? page + 1 : page - 1);
            }
            const elements = reports.map((report, i) => (
                <tr key={i}>
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
    }, [page, size]);

    return (
        <LayoutDashboard>
            <Title align="center">View Cache</Title>
            <Container fluid>
                <Center mt="md">
                    <Group grow direction="column" style={{ width: "100%" }}>
                        <div>
                            <Group position="apart">
                                <Box></Box>
                                <Group spacing={"xs"}>
                                    <Button
                                        compact
                                        onClick={() => {
                                            decrementPage();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </Button>
                                    <Text>Page {page}</Text>
                                    <Button
                                        compact
                                        onClick={() => {
                                            incrementPage();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Button>
                                </Group>
                                <Box>
                                    <SegmentedControl
                                        value={size}
                                        onChange={setSize}
                                        data={[
                                            { label: "15", value: "15" },
                                            { label: "25", value: "25" },
                                        ]}
                                    />
                                </Box>
                            </Group>
                            <Table>
                                <thead>
                                    <tr>
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
            </Container>
        </LayoutDashboard>
    );
};

export default Cache;
