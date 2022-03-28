import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";

import { prisma } from "@abuse-sleuth/prisma";
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

import DashboardLayout from "@layouts/DashboardLayout";
import { getSession } from "@libs/auth/authServerHelpers";

export default function Dashboard({
    totalIPs,
    totalScans,
}: {
    totalIPs: number;
    totalScans: number;
}) {
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
                                title="Global IPs"
                                stat={totalIPs}
                                color={"blue"}
                            />
                            <StatsCard
                                icon={
                                    <FontAwesomeIcon icon={["fas", "file"]} />
                                }
                                title="IPs Scanned in Reports"
                                stat={totalScans}
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
    try {
        const session = await getSession(context.req, context.res);

        const countIPs = await prisma.iPProfile.count({
            where: {
                updatedAt: {
                    gte: dayjs().subtract(30, "day").toDate(),
                },
            },
        });
        const countIPLinksByUser = await prisma.iPProfileOnScanReport.count({
            where: {
                report: {
                    userId: session.id,
                    updatedAt: {
                        gte: dayjs().subtract(30, "day").toDate(),
                    },
                },
            },
        });

        return {
            props: {
                totalIPs: countIPs,
                totalScans: countIPLinksByUser,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
};
