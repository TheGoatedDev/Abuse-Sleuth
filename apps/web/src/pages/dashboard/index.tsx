import type { GetServerSideProps, NextPage } from "next";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Group,
    SimpleGrid,
    Skeleton,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { StatsCard } from "@abuse-sleuth/ui/components/compounds";

import { Layout } from "@components/dashboard/layouts";

const Dashboard: NextPage = () => {
    const getSelfActiveTeamQuery =
        trpcClient.teams.getSelfActiveTeam.useQuery();

    return (
        <Layout>
            <Group mb="md">
                <Title>
                    Dashboard for{" "}
                    {!getSelfActiveTeamQuery.isLoading &&
                        getSelfActiveTeamQuery.isSuccess &&
                        getSelfActiveTeamQuery.data?.teamName}
                </Title>
                {getSelfActiveTeamQuery.isLoading && (
                    <Skeleton width={"20%"} height={"32px"} />
                )}
            </Group>
            <SimpleGrid cols={3}>
                <StatsCard
                    label={"Scan Count"}
                    progress={{ current: 1000, max: 10000 }}
                    color={"indigo"}
                    icon={"unchanged"}
                />
                <StatsCard
                    label={"Reports Done"}
                    progress={50}
                    color={"violet"}
                    icon={"up"}
                />
                <StatsCard
                    label={"Report Count"}
                    progress={{ current: 10, max: 30 }}
                    color={"grape"}
                    icon={"unchanged"}
                />
            </SimpleGrid>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default Dashboard;
