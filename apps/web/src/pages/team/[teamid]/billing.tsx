import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import {
    nextAuthOptions,
    unstable_getServerSession,
} from "@abuse-sleuth/authentication";
import { requireAuth } from "@abuse-sleuth/authentication/nextjs";
import { appRouter } from "@abuse-sleuth/trpc";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import {
    Button,
    Divider,
    Group,
    Icon,
    Loader,
    Skeleton,
    Space,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { IconExclamationMark, IconHome } from "@abuse-sleuth/ui/icons";

import { Layout } from "@components/dashboard/layouts";
import { PlanSwitcher } from "@components/teams/billing/features/PlanSwitcher";
import Routes from "@utils/routes";

const TeamBilling: NextPage = () => {
    const router = useRouter();
    const teamId = router.query.teamid as string;

    const getTeamQuery = trpcClient.teams.get.useQuery({
        teamId,
    });

    //  TODO: Improve this, Make it Centralised
    if (getTeamQuery.isLoading) {
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

    // TODO: Improve this, Make it Centralised
    if (getTeamQuery.isError || !getTeamQuery.data) {
        return (
            <Layout>
                <Group
                    position="center"
                    sx={() => ({
                        height: "100vh",
                    })}>
                    <Stack spacing={"xs"} align={"center"}>
                        <Icon
                            icon={<IconExclamationMark />}
                            color={"red"}
                            size={56}
                            stroke={3}
                        />
                        <Title>Error has Occurred</Title>
                        <Text>Error: {getTeamQuery.error?.message}</Text>
                        <Text color={"dimmed"} size="xs">
                            Check the Console, if you are tech-savvy...
                        </Text>
                    </Stack>
                </Group>
            </Layout>
        );
    }

    return (
        <Layout>
            <Group position="apart">
                <Title>
                    Billing -{" "}
                    {getTeamQuery.data.teamName ?? <Skeleton width={45} />}
                </Title>

                <Link href={Routes.team.view(teamId)} passHref>
                    <Button
                        component={"a"}
                        color={"violet"}
                        leftIcon={<IconHome size={"16px"} />}>
                        Return
                    </Button>
                </Link>
            </Group>
            <Divider my="md" />
            <Title mb={"sm"}>Plans</Title>
            <PlanSwitcher teamId={teamId} />
            <Space h={"xl"} />
            <Title>Invoices</Title>
            <Text>Coming Soon</Text>
        </Layout>
    );
};

// TODO: Make it look nicer
export const getServerSideProps: GetServerSideProps = requireAuth(
    async (context) => {
        const teamId = context.query["teamid"] as string;

        const session = await unstable_getServerSession(
            context.req,
            context.res,
            nextAuthOptions
        );

        const caller = appRouter.createCaller({ user: session!.user });

        try {
            const selfMember = await caller.teams.members.getSelf({
                teamId,
            });

            if (selfMember?.role === "OWNER") {
                return {
                    props: {},
                };
            }
        } catch (error) {
            return {
                redirect: {
                    destination: Routes.team.view(teamId),
                },
                props: {},
            };
        }

        return {
            props: {},
        };
    }
);

export default TeamBilling;
