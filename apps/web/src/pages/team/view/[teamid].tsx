import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button, Group,
    Icon,
    Loader,
    Skeleton,
    Stack, Text, Title
} from "@abuse-sleuth/ui/components/atoms";
import { IconEdit, IconExclamationMark, IconLock } from "@abuse-sleuth/ui/icons";

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

    if (getSelfTeamQuery.isError || !getSelfTeamQuery.data) {
        return (
            <Layout>
                <Group position="center" sx={() => ({
                    height: "100vh"
                })}>

                    <Stack spacing={"xs"} align={"center"} >
                        <Icon icon={<IconExclamationMark />} color={"red"} size={56} stroke={3} />
                        <Title>Error has Occurred</Title>
                        <Text>Error: {getSelfTeamQuery.error?.message}</Text>
                        <Text color={"dimmed"} size="xs">Check the Console, if you are tech-savvy...</Text>

                    </Stack>

                </Group>
            </Layout>
        );
    };



    return (
        <Layout>
            <Group position="apart">
                <Title>
                    {getSelfTeamQuery.data.teamName ?? <Skeleton width={45} />}
                </Title>
                <Link
                    passHref
                    href={getSelfTeamQuery.data.locked ? "#" : routes.team.editTeam(
                        getSelfTeamQuery.data.id
                    )}
                >
                    <Button
                        component="a"
                        color="violet"
                        leftIcon={getSelfTeamQuery.data.locked ? <IconLock size="16px" /> : <IconEdit size="16px" />}
                        disabled={getSelfTeamQuery.data.locked}>
                        Edit Team
                    </Button>
                </Link>
            </Group>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = requireAuth();

export default TeamViewSingle;
