import type { GetServerSideProps, NextPage } from "next";
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
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Title,
} from "@abuse-sleuth/ui/components/atoms";
import { PricingCard } from "@abuse-sleuth/ui/components/compounds";
import { IconExclamationMark } from "@abuse-sleuth/ui/icons";

import { Layout } from "@components/dashboard/layouts";
import Routes from "@utils/routes";

const TeamBilling: NextPage = () => {
    const router = useRouter();
    const teamId = router.query.teamid as string;

    const getTeamQuery = trpcClient.teams.get.useQuery({
        teamId,
    });

    const getCheckoutSession =
        trpcClient.stripe.getCheckoutSession.useMutation();

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
                    {getTeamQuery.data.teamName ?? <Skeleton width={45} />}{" "}
                    Billing
                </Title>
            </Group>
            <Divider my="md" />
            <SimpleGrid
                spacing={"xl"}
                breakpoints={[
                    { minWidth: "md", cols: 2 },
                    { minWidth: "sm", cols: 2 },
                    { minWidth: "xs", cols: 1 },
                ]}>
                <PricingCard
                    title="Title 1"
                    description="Description 1"
                    pricing={0}
                    currency="GBP"
                    listItems={["1 Team Member"]}
                />
                <PricingCard
                    title="Title 2"
                    description="Description 2"
                    pricing={2000}
                    currency="GBP"
                    listItems={["5 Team Members", "Exporting to File"]}
                />
            </SimpleGrid>
            <Stack spacing={"xs"}>
                <Button
                    onClick={async () => {
                        const session = await getCheckoutSession.mutateAsync({
                            teamId,
                            productId: "prod_MRDxk1gvhCF8U1",
                            checkout: {
                                cancel_url: "http://localhost:3000",
                                success_url: "http://localhost:3000",
                            },
                        });
                        console.log(session);
                    }}>
                    prod_MRDxk1gvhCF8U1
                </Button>
            </Stack>
        </Layout>
    );
};

// TODO: Check if OWNER
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
