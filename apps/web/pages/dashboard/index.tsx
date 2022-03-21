import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import {
    Box,
    Card,
    Center,
    Container,
    Group,
    Paper,
    SimpleGrid,
    StatsCard,
    Text,
    Title,
} from "@abuse-sleuth/ui";

import DashboardLayout from "@layouts/dashboardLayout";
import DefaultLayout from "@layouts/defaultLayout";

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
                                icon={
                                    <FontAwesomeIcon icon={["fas", "earth"]} />
                                }
                                title="Global IPs Scanned"
                                stat="TODO"
                                color={"blue"}
                            />
                            <StatsCard
                                icon={
                                    <FontAwesomeIcon icon={["fas", "file"]} />
                                }
                                title="IPs Scanned"
                                stat="TODO"
                                color={"blue"}
                            />
                            <StatsCard
                                icon={<FontAwesomeIcon icon={["fas", "bug"]} />}
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
