import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { Group, Skeleton, Title } from "@abuse-sleuth/ui/components/atoms";

import { Layout } from "@components/dashboard/layouts";

const Dashboard: NextPage = () => {
    const getSelfActiveTeamQuery =
        trpcClient.teams.getSelfActiveTeam.useQuery();

    return (
        <Layout>
            <Group>
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
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default Dashboard;
