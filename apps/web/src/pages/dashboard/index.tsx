import { useTeams } from "@contexts/TeamsContext";
import type { GetServerSideProps, NextPage } from "next";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { Group, SimpleGrid, Title } from "@abuse-sleuth/ui/components/atoms";
import { StatsCard } from "@abuse-sleuth/ui/components/compounds";

import { Layout } from "@components/dashboard/layouts";

const Dashboard: NextPage = () => {
    const teams = useTeams();

    return (
        <Layout>
            <Group mb="md">
                <Title>
                    Dashboard for {teams.activeTeam?.teamName ?? "Loading"}
                </Title>
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
