import type { GetServerSideProps, NextPage } from "next";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Group,
    Loader,
    Paper,
    SimpleGrid,
    Space,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { StatsCard } from "@abuse-sleuth/ui/components/compounds";

import { Layout } from "@components/dashboard/layouts";

const Dashboard: NextPage = () => {
    const getActiveTeam = trpcClient.users.getActiveTeamSelf.useQuery();

    if (getActiveTeam.isFetching) {
        return (
            <Layout>
                <Group
                    position="center"
                    sx={() => ({
                        height: "100vh",
                    })}>
                    <Loader size={"xl"} color="violet" />
                </Group>
            </Layout>
        );
    }

    return (
        <Layout>
            <Group mb="md">
                <Title>
                    Dashboard for {getActiveTeam.data?.teamName ?? "Loading"}
                </Title>
            </Group>
            <SimpleGrid cols={3}>
                <StatsCard
                    label={"Scan Count"}
                    progress={{
                        current: Math.floor(Math.random() * 10000),
                        max: 10000,
                    }}
                    withAbbreviation
                    color={"indigo"}
                    icon={"unchanged"}
                />
                <StatsCard
                    label={"Reports Done"}
                    progress={Math.floor(Math.random() * 100)}
                    color={"violet"}
                    icon={"up"}
                />
                <StatsCard
                    label={"Report Count"}
                    progress={{
                        current: Math.floor(Math.random() * 30),
                        max: 30,
                    }}
                    color={"grape"}
                    icon={"unchanged"}
                />
            </SimpleGrid>
            <Space h={"md"} />
            <Paper withBorder p={"xs"}>
                <Title order={2}>News</Title>
                <Stack>
                    <Paper p={"sm"}>
                        <Group>
                            <Title order={3}>Title</Title>
                            <Text color={"dimmed"} size={"xs"}>
                                {new Date().toLocaleString()}
                            </Text>
                        </Group>
                        <Text>CONTENT</Text>
                    </Paper>
                </Stack>
            </Paper>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default Dashboard;
