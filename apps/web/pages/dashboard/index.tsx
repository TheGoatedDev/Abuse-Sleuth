import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import StatsCard from "@components/StatsCard";
import DashboardLayout from "@layouts/dashboardLayout";
import DefaultLayout from "@layouts/defaultLayout";

import {
    Box,
    Card,
    Center,
    Container,
    Group,
    Paper,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <Container mt={"xl"}>
                <Center>
                    <Card withBorder>
                        <Title order={2} mb="xs">
                            Statistics of the Past 30 Days
                        </Title>
                        <SimpleGrid
                            breakpoints={[
                                { minWidth: "xs", cols: 1 },
                                { minWidth: "md", cols: 3 },
                            ]}>
                            <StatsCard
                                icon={["fas", "earth"]}
                                title="Global IPs Scanned"
                                stat="TODO"
                                color={"blue"}
                            />
                            <StatsCard
                                icon={["fas", "file"]}
                                title="IPs Scanned"
                                stat="TODO"
                                color={"blue"}
                            />
                            <StatsCard
                                icon={["fas", "bug"]}
                                title="Malicious IPs"
                                stat="TODO"
                                color={"red"}
                            />
                        </SimpleGrid>
                    </Card>
                </Center>
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
