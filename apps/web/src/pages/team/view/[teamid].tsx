import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Group,
    Loader,
    Skeleton,
    Title
} from "@abuse-sleuth/ui/components/atoms";
import { IconEdit } from "@abuse-sleuth/ui/icons";

import { Layout } from "@components/dashboard/layouts";
import routes from "@utils/routes";

const TeamViewSingle: NextPage = () => {
    const router = useRouter();
    const getSelfTeamQuery = trpcClient.teams.getSelfTeam.useQuery({
        teamId: router.query.teamid as string,
    });

    if (getSelfTeamQuery.isLoading) {
        return (
            <Layout>
                <Group position="center" sx={() => ({
                    height: "100vh"
                })}>
                    <Loader size={"xl"} color="violet" />
                </Group>
            </Layout>
        );
    }

    return (
        <Layout>
            <Group position="apart">
                <Title>
                    {getSelfTeamQuery.data?.teamName ?? <Skeleton width={45} />}
                </Title>
                <Link
                    passHref
                    href={routes.team.editTeam(
                        getSelfTeamQuery.data?.id ?? ""
                    )}>
                    <Button
                        component="a"
                        color="violet"
                        rightIcon={<IconEdit />}>
                        Edit Team
                    </Button>
                </Link>
            </Group>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamViewSingle;
