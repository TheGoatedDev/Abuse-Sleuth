import type { GetServerSideProps, NextPage } from "next";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Group,
    Loader,
    SimpleGrid,
    Space,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { StatsCard } from "@abuse-sleuth/ui/components/compounds";

import { NewsSection } from "@components/dashboard/features/NewsSection";
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
            <NewsSection />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default Dashboard;
