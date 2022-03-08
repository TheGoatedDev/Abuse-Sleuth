import { useRouter } from "next/router";

import StatsCard from "@components/StatsCard";
import DashboardLayout from "@layouts/dashboardLayout";

import {
    Card,
    Center,
    Container,
    SimpleGrid,
    Space,
    Table,
    Title,
    Text,
} from "@mantine/core";

export default function ReportView() {
    const router = useRouter();
    const { reportID } = router.query;

    return (
        <DashboardLayout>
            <Container mt={"lg"}>
                <Center>
                    <Card withBorder>
                        <Title order={2}>Report: {reportID}</Title>
                        <Text color={"subtle"} size="xs" mb="xs">
                            Created At: TODO
                        </Text>
                        <SimpleGrid
                            breakpoints={[
                                { minWidth: "xs", cols: 1 },
                                { minWidth: "md", cols: 2 },
                            ]}>
                            <StatsCard
                                icon={["fas", "earth"]}
                                title="Total IPs Scanned"
                                stat="TODO"
                                color={"blue"}
                            />
                            <StatsCard
                                icon={["fas", "flag"]}
                                title="Most Common Country"
                                stat="TODO"
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>TODO</tbody>
                </Table>
            </Container>
        </DashboardLayout>
    );
}
