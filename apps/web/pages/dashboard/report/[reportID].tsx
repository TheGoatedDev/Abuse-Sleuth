import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    StatsCard,
    CountryFlagText,
} from "@abuse-sleuth/ui";

import {
    ReportIPProfileItem,
    ScanStatus,
} from "@components/tables/reportInfoViewer/reportIPProfileItem";
import { useAuth } from "@hooks/AuthHook";
import DashboardLayout from "@layouts/DashboardLayout";
import getOneReportFromAPI from "@libs/api/helper/getOneReportFromAPI";

// TODO: Migrate to another file
function mode(arr) {
    return arr
        .sort(
            (a, b) =>
                arr.filter((v) => v === a).length -
                arr.filter((v) => v === b).length
        )
        .pop();
}

// TODO: Removed after Testing
function getRandomEnumValue<T>(anEnum: T): T[keyof T] {
    //save enums inside array
    const enumValues = Object.keys(anEnum) as Array<keyof T>;

    //Generate a random index (max is array length)
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    // get the random enum value

    const randomEnumKey = enumValues[randomIndex];
    return anEnum[randomEnumKey];
    // if you want to have the key than return randomEnumKey
}

export default function ReportView() {
    const router = useRouter();
    const auth = useAuth(true);
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

            //console.log(countries);

            setMostCommonCountry(mode(countries));

            // TODO: Complete the Scan Status
            setTableItems(
                report.ipProfiles.map((ipProfile, index) => {
                    //console.log(getRandomEnumValue(ScanStatus));
                    return (
                        <ReportIPProfileItem
                            key={index}
                            ipAddress={ipProfile.ipAddress}
                            countryCode={ipProfile.countryCode}
                            isPrivate={ipProfile.privateAddress}
                            createdAt={ipProfile.createdAt}
                            scanStatuses={{
                                abuseIPDB: getRandomEnumValue(ScanStatus),
                            }}
                        />
                    );
                })
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
                        <Text color={"dimmed"} size="xs" mb="xs">
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
                                icon={
                                    <FontAwesomeIcon icon={["fas", "earth"]} />
                                }
                                title="Total IPs Scanned"
                                stat={report.ipProfiles.length}
                                color={"blue"}
                            />
                            <StatsCard
                                icon={
                                    <FontAwesomeIcon icon={["fas", "flag"]} />
                                }
                                title="Most Common Country"
                                stat={
                                    <CountryFlagText
                                        countryCode={mostCommonCountry}
                                    />
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
