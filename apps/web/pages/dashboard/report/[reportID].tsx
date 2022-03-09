import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import StatsCard from "@components/StatsCard";
import DashboardLayout from "@layouts/dashboardLayout";
import getOneReportFromAPI from "@libs/api/helper/getOneReportFromAPI";

import {
    Card,
    Center,
    Container,
    SimpleGrid,
    Space,
    Table,
    Title,
    Text,
    Loader,
} from "@mantine/core";

function mode(arr) {
    return arr
        .sort(
            (a, b) =>
                arr.filter((v) => v === a).length -
                arr.filter((v) => v === b).length
        )
        .pop();
}

export default function ReportView() {
    const router = useRouter();
    const { reportID } = router.query;

    const [report, setReport] = useState<any>();
    const [tableItems, setTableItems] = useState<JSX.Element[]>();
    const [mostCommonCountry, setMostCommonCountry] = useState<string>("");

    useEffect(() => {
        (async () => {
            setReport(await getOneReportFromAPI(reportID as string));
        })();
    }, [reportID]);

    useEffect(() => {
        if (report) {
            const countries = report.ipProfiles.map((item) => item.countryCode);

            console.log(countries);

            setMostCommonCountry(mode(countries));

            setTableItems(
                report.ipProfiles.map((ipProfile, index) => (
                    <tr key={index}>
                        <td>{ipProfile.ipAddress}</td>
                        <td>
                            {ipProfile.countryCode !== "Unknown" && (
                                <ReactCountryFlag
                                    countryCode={ipProfile.countryCode}
                                />
                            )}{" "}
                            {ipProfile.countryCode}
                        </td>
                        <td>TODO</td>
                        <td>
                            {dayjs(ipProfile.createdAt).format(
                                "DD/MM/YYYY hh:mm:ss A"
                            )}
                        </td>
                        <td>TODO</td>
                    </tr>
                ))
            );
        }
    }, [report]);

    if (report === undefined) {
        return (
            <DashboardLayout>
                <Center
                    sx={(theme) => ({
                        height: "100vh",
                    })}>
                    <Loader size="xl" />
                </Center>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Container mt={"lg"}>
                <Center>
                    <Card withBorder>
                        <Title order={2}>Report: {reportID}</Title>
                        <Text color={"subtle"} size="xs" mb="xs">
                            Created At:{" "}
                            {dayjs(report.createdAt).format(
                                "DD/MM/YYYY hh:mm:ss A"
                            )}
                        </Text>
                        <SimpleGrid
                            breakpoints={[
                                { minWidth: "xs", cols: 1 },
                                { minWidth: "md", cols: 2 },
                            ]}>
                            <StatsCard
                                icon={["fas", "earth"]}
                                title="Total IPs Scanned"
                                stat={report.ipProfiles.length}
                                color={"blue"}
                            />
                            <StatsCard
                                icon={["fas", "flag"]}
                                title="Most Common Country"
                                stat={
                                    <>
                                        {mostCommonCountry}{" "}
                                        <ReactCountryFlag
                                            countryCode={mostCommonCountry}
                                        />
                                    </>
                                }
                                color={"green"}
                            />
                        </SimpleGrid>
                    </Card>
                </Center>
                <Space h="xl" />
                <Table>
                    <thead>
                        <tr>
                            <th>IP Address</th>
                            <th>Country</th>
                            <th>Scan Status</th>
                            <th>First Reported At:</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{tableItems}</tbody>
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
